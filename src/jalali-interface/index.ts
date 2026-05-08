import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
  id: 'jalali-datepicker',
  name: 'انتخابگر تاریخ جلالی',
  description: 'انتخابگر تاریخ و زمان فارسی/جلالی برای Directus',
  icon: 'today',
  component: InterfaceComponent,
  types: ['dateTime', 'date', 'time', 'timestamp'],
  localTypes: ['standard'],
  group: 'selection',
  options: null,
});
