import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { db}  from '@/firebase'
import { collection, getDocs, query, where, onSnapshot } from "firebase/firestore";

export const useAppointStore = defineStore('appoint', () => {
  const appointState = ref([])  
  let appointments = []
  const colRef = collection(db, "appointments")

  // onMounted(async () =>{    
  //   const querySnapshot = await getDocs(colRef)
  //   querySnapshot.forEach((doc) => { 
  //     appointments.push(doc.data())            
  //     })
  //   console.log(appointments)
  //   appointState.value = appointments
  // })

  
  const unsubscribe = onSnapshot(colRef, (snap) => {
      snap.docChanges().forEach((change) =>{  
            let changedata = change.doc.data()
            changedata.id = change.doc.id    
            if (change.type === "added") {                            
              console.log("new appoint: ", changedata)              
              appointments.unshift(changedata)
              // appointState.value = appointments
            }
            if (change.type === "modified") {          
              console.log("modified: ", changedata)
              let index = appointments.findIndex(apt => apt.id === changedata.id)          
              Object.assign(appointments[index], changedata)
            }
            if (change.type === "removed") {          
              console.log("removed: ", changedata)          
              let index = appointments.findIndex(apt => apt.id === changedata.id)          
              appointments.splice(index, 1)
              // this.appointState.value = appointments
            }           
            appointState.value = appointments
          })          
        },
    (error) =>{
      console.log(error)
    }    
  )




//   const unsubscribe = onSnapshot(colRef,
//     (snap) =>{          
//           snap.forEach((doc) => {
//             let appointment = doc.data()
//             appointments.push(appointment)
//           })
//           appointState.value = appointments
//        },
//    (error) =>{
//      console.log(error)
//    }    
//  )

  
  
  function check() {
    // appoint 체크
  }
  function modify() {
    // appoint 수정
  }  

  return { appointState,  check, modify }
})
