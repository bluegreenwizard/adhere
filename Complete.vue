<template>
    <div 
        class="modal"
        :class="{'is-active': active}">
        <div class="modal-background">
        </div>
        <div class="modal-content box">
            <h1 class="title">Schedule Adherence Table</h1>
            <div id="complete" class="container">
                <table class="table is-bordered is-striped is-fullwidth">
                    <thead class="thead">
                        <th>Scheduled</th>
                        <th>Actual</th>
                        <th>Reason for Discrepancy</th>
                    </thead>
                    <tbody class="tbody">
                        <tr
                            v-for="(entry, i) in schedule"
                            :key="i">
                            <td>{{ entry.scheduled }}</td>
                            <td>{{ entry.actual }}</td>
                            <td>{{ entry.excuse || "NA" }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div 
            class="modal-close is-large"
            aria-label="close"
            @click="$emit('hideComplete')">
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
    }
}
</script>

<style lang="sass">
#btn-start 
    width: 100%
    height: 100%
</style>
