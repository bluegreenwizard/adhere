<template>
    <div class="box level is-mobile">
        <span class="level-left">
            <p id="time">{{ hhmm }}</p>
        </span>
        <span class="level-right">
            <button
                class="button is-large is-success"
                @click="logTime">
                Go on {{ nextBreakType }}
            </button>
        </span>
    </div>
</template>

<script>
import dateFns from 'date-fns';

export default {
    props: {
        schedule: Array,
        entryIndex: Number
    },
    data() {
        return {
            currentTime: new Date,
            nextBreakType: 'Break'
        }
    },
    methods: {
        logTime() {
            this.$emit('logTime', this.hhmm);
            if (this.entryIndex + 1 < this.schedule.length) {
                this.$emit('nextEntry', this.entryIndex + 1);
            }
        }
    },
    computed: {
        now() {
            return this.currentTime;
        },
        hhmm() {
            return dateFns.format(this.currentTime, "HH:mm");
        }
    },
    created() {
        setInterval(() => this.currentTime = new Date, 1000);
    }
}
</script>

<style lang="sass">
#time
    font-size: 2.8rem

</style>
