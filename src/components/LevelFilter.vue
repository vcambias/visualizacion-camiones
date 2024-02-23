<script>
import { ref, watch } from 'vue';
 
export default {
  props: {
    levelsInfo: Object,
  },
  setup(props,{ emit }) {
    const max_level = ref(null);
    const values = ref([]);
    const selectedValues = ref([]);
 
    watch(() => {
      values.value = {}
      selectedValues.value = props.levelsInfo.value.levelsHidden
      max_level.value = props.levelsInfo.value.max_level;
      values.value = Array.from({ length: max_level.value}, (_, index) => index + 1);
    });
 
    function levelChange(checkboxValue) {
      if (selectedValues.value.includes(checkboxValue)) {
        selectedValues.value = selectedValues.value.filter((c) => c !== checkboxValue)
      } else {
        selectedValues.value.push(checkboxValue)
      }
      emit('level-change', {selectedValues: selectedValues.value})
    }
 
    return {
      max_level,
      values,
      selectedValues,
      levelChange,
    };
  },
};
</script>
 
<template>
  <template v-if="values.length > 0">
    <div class="card" id="Checkbox">
      <div>Level: </div>
      <div v-for="value in values">
        <input
          type="checkbox"
          :id="'checkbox-' + value"
          :value="value"
          @change="() => levelChange(value)"
          checked="true"
        />
        <label :for="'checkbox-' + value">{{ value }}</label>
      </div>
    </div>
  </template>
</template>
 
<style>
#Checkbox {
  display: flex;
}
</style>