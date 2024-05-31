<template>   
<div id="app">
    <h1>Salary Slip Generator</h1>
    <form @submit.prevent="generatePDF">
      <div class="form-group">
        <label for="salary">Employee Salary:</label>
        <input type="number" v-model="salary" id="salary" />
      </div>
      <div class="form-group">
        <label for="attendance">Attendance:</label>
        <input type="number" v-model="attendance" id="attendance" />
      </div>
      <div class="form-group">
        <label for="workingDays">Working Days:</label>
        <input type="number" v-model="workingDays" id="workingDays" />
      </div>
      <div class="form-group">
        <label for="totalDays">Total Days:</label>
        <input type="number" v-model="totalDays" id="totalDays" />
      </div>
      <div class="form-group">
        <label for="month">Month:</label>
        <input type="text" v-model="month" id="month" />
      </div>
      <button type="submit">Generate PDF</button>
    </form>
  </div>
 </template>
  
  <script setup>
  import { ref } from 'vue';
  import jsPDF from 'jspdf';
  
  const salary = ref(15000);
  const attendance = ref(21);
  const workingDays = ref(21);
  const totalDays = ref(22);
  const month = ref('May 2024');
  
  const generatePDF = () => {
    const doc = new jsPDF();
  
    const presentDays = attendance.value;
    const totalSalary = (salary.value / workingDays.value) * presentDays;
    const deduction = salary.value - totalSalary;
  
    doc.text('Salary Slip', 20, 10);
    doc.text(`Month: ${month.value}`, 20, 20);
    doc.text(`Employee Salary: ${salary.value}`, 20, 30);
    doc.text(`Attendance: ${attendance.value}`, 20, 40);
    doc.text(`Working Days: ${workingDays.value}`, 20, 50);
    doc.text(`Total Days: ${totalDays.value}`, 20, 60);
    doc.text(`Present Days: ${presentDays}`, 20, 70);
    doc.text(`Total Salary: ${totalSalary.toFixed(2)}`, 20, 80);
    doc.text(`Deductions: ${deduction.toFixed(2)}`, 20, 90);
  
    doc.save(`Salary_Slip_${month.value}.pdf`);
  };
  </script>
  
  <style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 auto;
    width: 300px;
  }
  
  label {
    margin-top: 10px;
  }
  
  input {
    margin-top: 5px;
  }
  
  button {
    margin-top: 20px;
    padding: 10px 20px;
  }
  </style>
  