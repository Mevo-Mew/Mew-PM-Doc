<template>
    <i>
        {{ row[value] }}
    </i>
</template>

<script>
    export default {
        name: "mew-formset-defaultState",
        props:['row','value']
    }
</script>
