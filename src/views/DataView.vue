<script setup>
import { db}  from '@/firebase'
import { collection, getDocs } from "firebase/firestore";
import { onMounted, ref } from 'vue';
import { useAppointStore } from '../stores/appoint'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net';

const appoint = useAppointStore()
DataTable.use(DataTablesCore);

const columns = [
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
    
    <DataTable class="display" :columns="columns" :data="appoint.appointState" :options="{ select: true }" >
      <thead>
        <tr>
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
