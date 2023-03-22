import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { db}  from '@/firebase'
import { collection, getDocs } from "firebase/firestore";

export const useAppointStore = defineStore('appoint', () => {
  const appointState = ref([])  

  onMounted(async () =>{ 
    let appointments = []    
    const querySnapshot = await getDocs(collection(db, "appointments"));
    querySnapshot.forEach((doc) => { 
      appointments.push(doc.data())
      // console.log(doc.id, " => ", doc.data());    
      })
    console.log(appointments)
    appointState.value = appointments
  })
  
  function check() {
    // appoint 체크
  }
  function modify() {
    // appoint 수정
  }  

  return { appointState,  check, modify }
})
