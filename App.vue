<template>
    <div id="main" class="container">
        <setup 
            @start="initEntries"
            :schedule="schedule"
            :entry-index="entryIndex">
        </setup>
        <entries 
            @selectEntry="setEntryIndex"
            :schedule="schedule"
            :entry-index="entryIndex">
        </entries>
        <timer
            @logTime="setActual"
            @nextEntry="setEntryIndex"
            :schedule="schedule"
            :entry-index="entryIndex">
        </timer>
    </div>
</template>

<script>
import Setup from './Setup.vue';
import Entries from './Entries.vue';
import Timer from './Timer.vue';

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
                { scheduled: "10:00", actual: "", excuse: ""},
                { scheduled: "12:00", actual: "", excuse: ""},
                { scheduled: "15:00", actual: "", excuse: ""}
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
        }
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
