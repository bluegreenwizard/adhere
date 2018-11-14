<template>
    <div class="container box">
        <div class="columns is-mobile">
            <div class="column content">
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
                    :class="{ 'is-danger': !isAdherent(entryIndex) }"
                    :placeholder="!isAdherent(entryIndex) ? 'Explanation Required' : ''"
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
                                    :class="{ 
                                        'is-outlined': entryIndex !== i,
                                        'is-danger': !isAdherent(i) }"
                                    @click="$emit('selectEntry', i)"> 
                                    Select
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button 
                    class="button is-success is-fullwidth"
                    :disabled="!entriesAreComplete">
                    Complete
                </button>
                <br>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        schedule: Array,
        entryIndex: Number,
        isAdherent: Function,
        entriesAreComplete: Boolean
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
