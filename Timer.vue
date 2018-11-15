<template>
    <div class="box columns level is-mobile">
        <div class="column is-half">
            <h3>Additional Notes</h3>
            <textarea 
                class="textarea is-small"
                v-model="additionalNotes.note">
            </textarea>
        </div>
        <div class="column">
            <div class="colums">
                <div class="column">
                    <p id="time">{{ hhmm }}</p>
                </div>
                <div class="column">
                    <button
                        class="button is-medium is-success"
                        id="log-btn"
                        @click="logTime">
                        Go on {{ entryIndex % 2 === 0 ? 'Break' : 'Lunch' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dateFns from 'date-fns';

export default {
    props: {
        schedule: Array,
        additionalNotes: Object,
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
    font-size: 3rem
    text-align: center
#log-btn
    display: block
    margin: auto

</style>
