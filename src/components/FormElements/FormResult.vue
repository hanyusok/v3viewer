<template>
  <TypeBasedTransition :transition-type="'fadeUpDown'">
    <div v-if="isLastField" class="form-complete">
      <!-- <pre> {{ store.formData }} </pre> -->
      <h2>신청되었습니다!</h2>
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
