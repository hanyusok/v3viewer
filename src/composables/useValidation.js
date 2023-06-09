import { computed } from "vue";
import {
  minLength,
  required,
  email,
  numeric,
  helpers,
} from "@vuelidate/validators";

export function useValidation(props) {
  /**
   * values available in props
   * props.type
   * props.validation.minLength
   * props.validation.required
   * props.label
   */
  const validationMessage = computed(() => {
    if (props.type === "checkbox") {
      return `최소 ${props.validation.minLength} 이상!`;
    }
    return `최소 ${props.validation.minLength} ${
      props.validation.numeric ? "숫자" : "자"
    } 이상!`;
  });
  const rules = computed(() => ({
    /**
     * Can also have custom properties attached with validation
     * answer: helpers.withParams({ 'key': props.name }, (value) => value),
     */
    selectedValue: {
      required: props.validation.required
        ? helpers.withMessage(`체크해야 넘어갑니다.`, required)
        : false,
      minLength: props.validation.minLength
        ? helpers.withMessage(
            validationMessage.value,
            minLength(props.validation.minLength)
          )
        : false,
      email: props.validation.email
        ? helpers.withMessage("이메일 주소!", email)
        : false,
      numeric: props.validation.numeric
        ? helpers.withMessage("숫자!", numeric)
        : false,
      $autoDirty: true,
    },
  }));

  return {
    rules,
  };
}
