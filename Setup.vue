<template>
    <div 
        class="modal"
        :class="{'is-active': active}">
        <div class="modal-background">
        </div>
        <div class="modal-content box">
            <h1 class="title">Enter Schedule</h1>
            <div id="setup" class="container columns">
                <div class="column">
                    <div
                        v-for="(entry, i) in schedule"
                        :key="i"
                        class="field">
                        <input 
                            type="text"
                            v-model="entry.scheduled"
                            class="input is-info">
                    </div>
                </div>
                <div class="column">
                    <button 
                        id="btn-start" 
                        class="button is-info is-large"
                        @click="start">
                        Start
                    </button>
                </div>
            </div>
        </div>
        <div 
            class="modal-close is-large"
            aria-label="close"
            @click="start">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        schedule: Array
    },
    data() {
        return {
            active: true
        }
    },
    methods: {
        start() {
            this.$emit('start', this.schedule);
            this.active = false;
        }
    }
}
</script>

<style lang="sass">
#btn-start 
    width: 100%
    height: 100%
</style>
