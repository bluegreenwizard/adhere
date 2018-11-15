<template>
    <div id="main" class="container">
        <setup 
            @start="initEntries"
            :schedule="schedule"
            :entry-index="entryIndex"
            v-if="showSetup">
        </setup>
        <entries 
            @selectEntry="setEntryIndex"
            @showComplete="toggleComplete"
            :schedule="schedule"
            :entry-index="entryIndex"
            :is-adherent="isAdherent"
            :entries-are-complete="entriesAreComplete">
        </entries>
        <timer
            @logTime="setActual"
            @nextEntry="setEntryIndex"
            :schedule="schedule"
            :additional-notes="additionalNotes"
            :entry-index="entryIndex"
            :is-adherent="isAdherent">
        </timer>
        <complete 
            @hideComplete="toggleComplete"
            :schedule="schedule"
            :additional-notes="additionalNotes"
            v-if="showComplete">
        </complete>
        <div class="level is-mobile">
            <p>Last saved: {{ lastSavedString }} ago.</p>
            <button 
                @click="saveToLocal"
                class="button is-small is-outlined is-black">
                Save Now
            </button>
        </div>
    </div>
</template>

<script>
import Setup from './Setup.vue';
import Entries from './Entries.vue';
import Timer from './Timer.vue';
import Complete from './Complete.vue';
import hlp from './helpers.js';
import dateFns from 'date-fns';

export default {
    components: {
        Setup,
        Entries,
        Timer,
        Complete
    },
    data() {
        return {
            entryIndex: 0,
            currentTime: Date.now(),
            lastSaved: null,
            schedule: [
                { scheduled: '10:00', actual: "10:00", excuse: ""},
                { scheduled: '12:00', actual: "12:00", excuse: ""},
                { scheduled: '15:00', actual: "", excuse: ""}
            ],
            additionalNotes: {
                note: ""
            },
            showComplete: false,
            showSetup: true
        }
    },
    methods: {
        initEntries(schedule) {
            schedule.forEach((newSchedule, i) => {
                if (newSchedule.scheduled !== "") {
                    this.schedule[i].scheduled = newSchedule.scheduled;
                }
            });
        },
        setEntryIndex(n) {
            this.entryIndex = n;
        },
        setActual(time) {
            this.schedule[this.entryIndex].actual = time;
        },
        isAdherent(i = this.entryIndex) {
            const difference = Math.abs(hlp.differenceInMinutes(
                this.schedule[i].scheduled,
                this.schedule[i].actual
            ) || 0);

            return difference <= 5;
        },
        toggleComplete() {
            this.showComplete = !this.showComplete;
        },
        saveToLocal(e) {
            e.preventDefault();
            this.lastSaved = Date.now();
            localStorage.myAdhereApp = JSON.stringify({
                schedule: this.schedule,
                additionalNotes: this.additionalNotes,
                currentTime: this.currentTime,
                lastSaved: this.lastSaved
            });
        }
    },
    computed: {
        entriesAreComplete() {
            return this.schedule.every((entry, i) => {
                if (this.isAdherent(i)) {
                    return entry.scheduled !== "" && entry.actual !== "";
                } else {
                    return entry.scheduled !== "" && entry.actual !== "" && entry.excuse !== "";
                }
            });
        },
        lastSavedString() {
            if (!this.lastSaved) {
                return 'never'
            } else {
                return dateFns.distanceInWords(this.lastSaved, this.currentTime);
            }
        }
    },
    mounted() {
        if (localStorage.myAdhereApp) {
            const myAdhereApp = JSON.parse(localStorage.myAdhereApp);
            if (dateFns.isSameDay(myAdhereApp.currentTime, Date.now())) {
                this.schedule = myAdhereApp.schedule;
                this.additionalNotes = myAdhereApp.additionalNotes;
                this.lastSaved = myAdhereApp.lastSaved;
                this.showSetup = false;
            }
        }
        
        setInterval(this.saveToLocal, 1000 * 60 * 60);
        setInterval(() => {
            this.currentTime = Date.now()
        }, 1000);
    }
}
</script>

<style lang="sass">
@import 'bulma'

#main
    margin: 32px

.multi-line
    white-space: pre

</style>
