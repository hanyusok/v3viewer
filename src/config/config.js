import { instructions } from "./constants";

export const formConfig = [
  {
    type: "information",
    label: "",
    name: "info",
    text: instructions,
    buttonText: "네, 신청합니다",
    options: {
      attrs: {},
    },
    validation: {
      required: false,
    },
  },
  {
    type: "information",
    label: "",
    name: "info",
    text: `건강보험 적용됩니다.<p class="instructions">본인부담(0~6,000원)진료비 있습니다.</p><p class="instructions">접수 <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z"/></svg><strong>계좌이체(수납)</strong><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z"/></svg>비대면 진료</p><p class="instructions">...순서로 진행됩니다</p>`,
    buttonText: "네, 알겠습니다",
    options: {
      attrs: {},
    },
    validation: {
      required: false,
    },
  },
  {
    type: "radio",
    label: "마트의원 오신적 있나요?",
    name: "history",
    buttonText: "다음",
    options: {
      choices: ["네", "아니오", "글쎄요, 기억 안나요"],
    },
    validation: {
      required: true,
    },
  },
  {
    type: "checkbox",
    label: "어떤 진료를 원하시나요?",
    name: "why",
    buttonText: "네, 알겠습니다",
    options: {
      choices: [
        "감기",
        "장염",
        "처방전",
        "코로나 확진자",
        "기타",
      ],
    },
    validation: {
      required: true,
      minLength: 1,
    },
  },
  {
    type: "textarea",
    label: "메모",
    name: "memo",
    buttonText: "네, 알겠습니다",
    options: {
      attrs: {
        placeholder: "간단한 증상이나 메모 남겨주세요...",
      },
    },
    validation: {
      required: true,
    },
  },
  {
    type: "text",
    label: "이름",
    name: "name",
    buttonText: "다음...",
    options: {
      attrs: {
        placeholder: "진료받을 분",
      },
    },
    validation: {
      required: true,
      minLength: 2,
    },
  },
  {
    type: "text",
    label: "주민 번호?",
    name: "jumin",
    buttonText: "다음...",
    options: {
      attrs: {
        placeholder: "000000-0000000",
      },
    },
    validation: {
      required: true,
      minLength: 13,
    },
  },
  {
    type: "information",
    label: "잠깐 안내말씀",
    name: "info",
    text: `<p class="instructions">현재 진료중이면... </p><p class="instructions">잠시 10~30분 기다릴 수 있습니다.</p>`,
    buttonText: "네, 이해합니다...",
    options: {
      attrs: {},
    },
    validation: {
      required: false,
    },
  },
  {
    type: "text",
    label: "처방전 이메일 원하세요?",
    name: "email",
    buttonText: "괜찮아요. 문전약국에 보내주세요!",
    options: {
      attrs: {
        placeholder: "이메일 주소",
      },
    },
    validation: {
      required: false,
      email: true,
    },
  },
  {
    type: "text",
    label: "핸드폰(-없이)",
    name: "phone",
    buttonText: "여기로 연락주세요!",
    options: {
      attrs: {
        placeholder: "01012345678",
      },
    },
    validation: {
      required: true,
      numeric: true,
      minLength: 11,
    },
  },
];
