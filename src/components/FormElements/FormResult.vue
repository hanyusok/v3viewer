<template>
  <TypeBasedTransition :transition-type="'fadeUpDown'">
    <div v-if="isLastField" class="form-complete">
      <!-- <pre> {{ store.formData }} </pre> -->
      신청되었습니다.
    </div>
  </TypeBasedTransition>
  
</template>
<script setup>
// Transition - functional component
import TypeBasedTransition from "../Transitions/TypeBasedTransition";

// Pinia
import { useLeadStore } from "../../stores/LeadStore";

defineProps({
  isLastField: {
    type: Boolean,
    default: false,
  },
});
/**
 * Pinia
 */
const store = useLeadStore();

//firebase 전송

</script>
