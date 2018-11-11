<template>
    <div class="container box">
        <div class="columns is-mobile">
            <div class="column content is-large">
                <label class="label">
                    Scheduled: 
                    <input 
                        class="input"
                        v-model="current.scheduled">
                </label>
                <label class="label">
                    Actual: 
                    <input 
                        class="input"
                        v-model="current.actual">
                </label>
                <textarea 
                    class="textarea"
                    v-model="current.excuse">
                </textarea>
            </div>
            <div class="column">
                <table 
                    class="table is-striped is-fullwidth is-hoverable">
                    <tbody>
                        <tr
                            v-for="(entry, i) in schedule"
                            :key="i"
                            :class="{ 'is-selected': entryIndex === i }">
                            <td>
                                <p>{{ entry.scheduled }}</p>
                            </td>
                            <td>
                                <p>{{ entry.actual }}</p>
                            </td>
                            <td>
                                <button 
                                    class="button is-info is-fullwidth"
                                    :class="{ 'is-outlined': entryIndex !== i }"
                                    @click="$emit('selectEntry', i)"> 
                                    Select
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button 
                    class="button is-success is-fullwidth"
                    disabled>
                    Complete
                </button>
                <br>
            </div>
        </div>
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
            currentTime: new Date
        }
    },
    computed: {
        current() {
            return this.schedule[this.entryIndex]
        }
    }
}
</script>
