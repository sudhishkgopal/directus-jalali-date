<template>
  <div class="jalali-datepicker-interface">
    <div class="jalali-input-wrapper" @click="openDatePicker">
      <date-picker
        ref="datePickerRef"
        v-model="displayValue"
        :type="pickerType"
        :format="dynamicFormat"
        :display-format="dynamicDisplayFormat"
        :placeholder="props.placeholder"
        :editable="false"
        :auto-submit="props.autoSubmit"
        :clearable="false"
        :simple="props.simple"
        :color="props.color"
        :min="props.minDate"
        :max="props.maxDate"
        :disabled="props.disabled"
        :input-class="'jalali-input-clickable'"
        locale="fa"
        @update:model-value="handleChange"
        @open="emit('focus')"
        @close="emit('blur')"
      />
      <div
        v-if="props.clearable && value && !props.disabled"
        class="clear-button"
        @click.stop="clearValue"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment-jalali';
import 'moment-timezone';
import 'moment/locale/fa';
import { computed, ref, watch } from 'vue';

// Import the vue3-persian-datetime-picker component
// Note: This should be available from the node_modules
import DatePicker from 'vue3-persian-datetime-picker';

interface Props {
  value?: string | null;
  type?: string;
  format?: string;
  displayFormat?: string;
  placeholder?: string;
  editable?: boolean;
  autoSubmit?: boolean;
  clearable?: boolean;
  simple?: boolean;
  color?: string;
  minDate?: string;
  maxDate?: string;
  disabled?: boolean;
  collection?: string;
  field?: string;
  // Directus field meta information
  meta?: {
    field?: string;
    type?: string;
    [key: string]: any;
  };
}

interface Emits {
  (event: 'input', value: string | null): void;
  (event: 'focus'): void;
  (event: 'blur'): void;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'date',

  placeholder: 'تاریخ را انتخاب کنید',
  editable: true,
  autoSubmit: false,
  clearable: true,
  simple: false,
  color: 'var(--theme--primary)',
  disabled: false,
});

const emit = defineEmits<Emits>();

const value = ref(props.value);

let displayValue = ref<any>('');
const datePickerRef = ref();

// Computed properties
const pickerType = computed(() => {
  // Check if this is a datetime field from Directus meta
  const fieldType = props.meta?.type || props.type;

  // If it's a dateTime field in Directus, use datetime picker
  if (fieldType === 'dateTime' || fieldType === 'timestamp') {
    return 'datetime';
  }

  // Otherwise use the explicit type prop
  switch (props.type) {
    case 'datetime':
      return 'datetime';
    case 'time':
      return 'time';
    case 'year-month':
      return 'year-month';
    case 'year':
      return 'year';
    case 'month':
      return 'month';
    default:
      return fieldType === 'time' ? 'time' : 'date';
  }
});

// Dynamic format based on picker type
const dynamicFormat = computed(() => {
  const type = pickerType.value;

  switch (type) {
    case 'datetime':
      return props.format || 'YYYY-MM-DD HH:mm:ss';
    case 'date':
      return props.format || 'YYYY-MM-DD';
    case 'time':
      return props.format || 'HH:mm:ss';
    case 'year-month':
      return props.format || 'YYYY-MM';
    case 'year':
      return props.format || 'YYYY';
    case 'month':
      return props.format || 'MM';
    default:
      return props.format || 'YYYY-MM-DD';
  }
});

// Dynamic display format based on picker type
const dynamicDisplayFormat = computed(() => {
  const type = pickerType.value;

  switch (type) {
    case 'datetime':
      return props.displayFormat || 'jYYYY/jMM/jDD HH:mm';
    case 'date':
      return props.displayFormat || 'jYYYY/jMM/jDD';
    case 'time':
      return props.displayFormat || 'HH:mm';
    case 'year-month':
      return props.displayFormat || 'jYYYY/jMM';
    case 'year':
      return props.displayFormat || 'jYYYY';
    case 'month':
      return props.displayFormat || 'jMM';
    default:
      return props.displayFormat || 'jYYYY/jMM/jDD';
  }
});

// Handle value changes from parent
let stopWatching: (() => void) | undefined;
stopWatching = watch(
  () => props.value,
  (newValue) => {
    value.value = newValue;

    if (newValue !== null && displayValue.value === '') {
      const t = moment(newValue).parseZone().format();

      displayValue.value = moment.utc(t).tz('Asia/Tehran').format();

      queueMicrotask(() => {
        if (stopWatching) stopWatching();
      });
    }
  },
  { immediate: true },
);

// Handle changes from the date picker
function handleChange(selectedValue: string | null) {
  value.value = selectedValue;
  displayValue.value = selectedValue;

  if (pickerType.value === 'date') {
    emit('input', selectedValue);
  } else {
    emit(
      'input',
      new Date(selectedValue || '').toISOString().replace(/Z$/, ''),
    );
  }
}

// Open date picker programmatically
function openDatePicker() {
  if (!props.disabled && datePickerRef.value) {
    // Trigger click on the date picker to open it
    const inputElement = datePickerRef.value.$el.querySelector('.vpd-input');
    if (inputElement) {
      inputElement.click();
    }
  }
}

// Clear the selected value
function clearValue() {
  value.value = null;
  emit('input', null);
  displayValue.value = null;
}
</script>

<style>
.vpd-input-group {
  position: relative;
  display: flex;
  flex-grow: 1;
  gap: 8px !important;
  align-items: center;
  block-size: var(--theme--form--field--input--height);
  padding: var(--theme--form--field--input--padding) !important;
  padding-block: 0;
  color: var(--v-input-color, var(--theme--form--field--input--foreground));
  font-family: var(
    --v-input-font-family,
    var(--theme--fonts--sans--font-family)
  );
  background-color: var(
    --v-input-background-color,
    var(--theme--form--field--input--background)
  );
  border: var(--theme--border-width) solid
    var(--v-input-border-color, var(--theme--form--field--input--border-color));
  border-radius: var(--v-input-border-radius, var(--theme--border-radius));
  transition: var(--fast) var(--transition);
  transition-property: border-color, box-shadow;
  box-shadow: var(--theme--form--field--input--box-shadow);
  position: relative !important;
}

.vpd-input-group input {
  appearance: none !important;
  border: none !important;
  padding: 0 !important;
  position: relative;
}

.vpd-icon-btn {
  background-color: transparent !important;
  padding: 0px !important;
}

.vpd-icon-btn svg {
  fill: var(--theme--foreground-subdued) !important;
  width: 20px !important;
  height: 20px !important;
}

.clear-button {
  position: absolute;
  top: calc(50% - 12px);
  left: var(--theme--form--field--input--padding);
  cursor: pointer;
}

.clear-button:dir(ltr) {
  left: auto !important;
  right: var(--theme--form--field--input--padding);
}

.clear-button svg {
  stroke: var(--theme--foreground-subdued) !important;
  width: 24px !important;
  height: 24px !important;
}

.clear-button:hover svg {
  stroke: var(--theme--danger) !important;
}

.vpd-container {
  overflow: hidden !important;
  border-radius: var(--v-input-border-radius, var(--theme--border-radius));
}
</style>
