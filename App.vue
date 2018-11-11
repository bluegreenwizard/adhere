<template>
    <div id="main" class="container">
        <!-- <setup 
            @start="initEntries"
            :schedule="schedule"
            :entry-index="entryIndex">
        </setup> -->
        <entries 
            @selectEntry="setEntryIndex"
            :schedule="schedule"
            :entry-index="entryIndex"
            :is-adherent="isAdherent">
        </entries>
        <timer
            @logTime="setActual"
            @nextEntry="setEntryIndex"
            :schedule="schedule"
            :entry-index="entryIndex"
            :is-adherent="isAdherent">
        </timer>
    </div>
</template>

<script>
import Setup from './Setup.vue';
import Entries from './Entries.vue';
import Timer from './Timer.vue';
import hlp from './helpers.js';

export default {
    components: {
        Setup,
        Entries,
        Timer
    },
    data() {
        return {
            view: "setup",
            entryIndex: 0,
            currentTime: new Date,
            schedule: [
                { scheduled: '10:00', actual: "", excuse: ""},
                { scheduled: '12:00', actual: "", excuse: ""},
                { scheduled: '15:00', actual: "", excuse: ""}
            ]
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
            const difference = hlp.differenceInMinutes(
                this.schedule[i].scheduled,
                this.schedule[i].actual
            ) || 0;
            return difference <= 5;
        }
    },
    computed: {
        
    },
    created () {
        
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
