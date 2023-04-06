import { ref, computed } from "vue";
import { collection, addDoc } from "firebase/firestore";
//import { db } from "@/utilities/firebase";
import { db } from "../firebase"
import { useLeadStore } from "@/stores/LeadStore";

export function useForm(formLength) { 
  /**
   * Returned
   * **/
  const formData = ref({})

  /**
   * Returned
   * **/
  const formState = ref({
    activeField: 0,
    valid: true,
    next: true,
    formLength: formLength,
    isLastField: computed(() => {
      return formState.value.activeField === formLength;
    }),
    isFirstField: computed(() => {
      return formState.value.activeField < 1;
    }),
    errorLength: 0,
  });

  /**
   * Returned
   * **/
  function validateField(value) {
    formState.value.valid = value;
  }

  /**
   * Returned
   * **/

  const store = useLeadStore()

  function onSubmit() {
    if (formState.value.errorLength > 0) {
      validateField(false);
    } else {
      validateField(true);
      next();
    }
    //firestore add document    
    if (formState.value.isLastField){
      try {
        addDoc(collection(db, "appointments"), store.formData)
        console.log("Document written")
      } catch (e) {
        console.error("Error adding document: ", e)
      }
    }
  }

  /**
   * Returned
   * **/
  function back() {
    formState.value.next = false;
    formState.value.activeField--;
  }

  function next() {
    formState.value.next = true;
    formState.value.activeField++;
  }

  return {
    formData,
    formState,
    validateField,
    onSubmit,
    back,
  };
}
