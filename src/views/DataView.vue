<script setup>
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net';
import languageKO from 'datatables.net-plugins/i18n/ko.json'
import { ref } from 'vue'
import { db}  from '@/firebase'
import { collection, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
// import { formatDistanceToNow } from 'date-fns'
import { formatRelative } from 'date-fns'
import { ko } from 'date-fns/esm/locale'

DataTable.use(DataTablesCore)

const colRef = collection(db, "appointments")
const q = query(colRef, orderBy('createdAt', 'asc'))
const aptRef = ref([])
let appointments = aptRef.value  

const unsubscribe = onSnapshot(q, (snap) => {
      snap.docChanges().forEach((change) =>{  
            let changedata = change.doc.data()

            //DateTime Conversion
            let preDate = changedata.createdAt.toDate()
            if (preDate){
              // changedata.createdAt = formatDistanceToNow(preDate)
              changedata.createdAt = formatRelative(preDate, new Date(), { locale: ko})
            }

            changedata.id = change.doc.id    
            if (change.type === "added") {                          
              appointments.unshift(changedata)              
            }
            if (change.type === "modified") {                        
              let index = appointments.findIndex(apt => apt.id === changedata.id)          
              Object.assign(appointments[index], changedata)
            }
            if (change.type === "removed") {                        
              let index = appointments.findIndex(apt => apt.id === changedata.id)          
              appointments.splice(index, 1)              
            }                       
          })          
        },
      (error) =>{
        console.log(error)
      }    
  )



const columns = [
  { data: 'createdAt' },	
  { data: 'name' },	
  { data: 'jumin' },  
	{ data: 'history' },	
	{ data: 'memo' },	
	{ data: 'phone' },
	{ data: 'why' },
  { data: 'email' },
]

</script>

<template>
  <main>   
    <!-- <button @click="add">Add new row</button><br />
    <button @click="update">Update selected rows</button><br />
    <button @click="remove">Delete selected rows</button> -->
    
    <DataTable class="display" :columns="columns" :data="aptRef" :options="{ select: true, responsive: true, language: languageKO }" >
      <thead>
        <tr>
          <th>날짜</th>
          <th>이름</th>
          <th>주민번호</th>          
          <th>재진?</th>          
          <th>메모</th>          
          <th>핸드폰</th>
			    <th>내용</th>
          <th>이메일</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>날짜</th>
          <th>이름</th>
          <th>주민번호</th>          
          <th>재진?</th>          
          <th>메모</th>          
          <th>핸드폰</th>
			    <th>내용</th>
          <th>이메일</th>
        </tr>
      </tfoot>
    </DataTable>
  </main>
</template>
<style>
@import 'datatables.net-dt';
@import 'datatables.net-bs5';
</style>
