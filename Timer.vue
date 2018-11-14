<template>
    <div class="box columns level is-mobile">
        <div class="column is-half">
            <h3>Additional Notes</h3>
            <textarea 
                class="textarea is-small"
                v-model="additionalNotes">

            </textarea>
        </div>
        <div class="column content is-large is-one-quarter">
            <p id="time">{{ hhmm }}</p>
        </div>
        <div class="column is-one-quarter">
            <button
                class="button is-large is-success is-fullwidth"
                @click="logTime">
                Go on {{ entryIndex % 2 === 0 ? 'Break' : 'Lunch' }}
            </button>
        </div>
    </div>
</template>

<script>
import dateFns from 'date-fns';

export default {
    props: {
        schedule: Array,
        additionalNotes: String,
        entryIndex: Number,
        isAdherent: Function
    },
    data() {
        return {
            currentTime: new Date
        }
    },
    methods: {
        logTime() {
            this.$emit('logTime', this.hhmm);
            if (this.entryIndex + 1 < this.schedule.length 
                && this.isAdherent(this.entryIndex)) {
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
    font-size: 3.5rem

</style>
