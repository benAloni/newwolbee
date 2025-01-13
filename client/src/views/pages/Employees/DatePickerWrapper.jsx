import React from 'react';
import DatePicker from 'react-datepicker';

const DatePickerWrapper = ({ selectedDate, onChange, label }) => (
  <div style={{ marginTop: '20px' }}>
    <h2 style={{ marginBottom: '10px' }}>{label}</h2>
    <DatePicker selected={selectedDate} onChange={onChange} inline />
  </div>
);

export default DatePickerWrapper;