<template>
  <div class="jalali-formatter">
    <span v-if="formattedDate" class="jalali-date">{{ formattedDate }}</span>
    <span v-else-if="value" class="invalid-date">{{ invalidDateText }}</span>
    <span v-else class="no-date">{{ noDateText }}</span>
  </div>
</template>

<script setup lang="ts">
import humanizeDuration from 'humanize-duration';
import momentJalali from 'moment-jalali';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

// Configure moment-jalali
momentJalali.loadPersian({ dialect: 'persian-modern' });

interface Props {
  value?: string | null;
  format?: string;
  options?: {
    format?: string;
  };
}

const props = withDefaults(defineProps<Props>(), {
  value: null,
  format: 'jYYYY/jMM/jDD',
  options: () => ({}),
});

const { t } = useI18n();
const invalidDateText = computed(() => t('invalid_date', 'Invalid date (تاریخ نامعتبر)'));
const noDateText = computed(() => t('no_value', '—'));

const formatString = computed(() => {
  // Priority: options.format > format prop > default
  return props.options?.format || props.format || 'jYYYY/jMM/jDD';
});

// For relative dates
const currentTime = ref(new Date());
let intervalId: NodeJS.Timeout | null = null;

onMounted(() => {
  if (formatString.value === 'relative') {
    // Update current time every second for relative dates
    intervalId = setInterval(() => {
      currentTime.value = new Date();
    }, 1000);
  }
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});

const formattedDate = computed(() => {
  if (!props.value) return null;

  try {
    // Parse the input date (should be a Gregorian date from Directus)
    const date = momentJalali(props.value);

    // Check if the date is valid
    if (!date.isValid()) {
      console.warn('Invalid date provided to jalali formatter:', props.value);
      return null;
    }

    // Handle relative format
    if (formatString.value === 'relative') {
      // Get Tehran timezone time
      const timeToTehran = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Tehran',
      });

      const inputDate = new Date(props.value);
      const tehranTime = new Date(timeToTehran);
      const duration = inputDate.getTime() - tehranTime.getTime();

      // Determine appropriate units based on duration
      let units: any[] = ['y'];

      const absDuration = Math.abs(duration);

      if (absDuration < 60 * 1000) {
        units.push('s');
      }

      if (absDuration < 60 * 60 * 1000) {
        units.push('m');
      }

      if (absDuration < 60 * 60 * 24 * 1000) {
        units.push('h');
      }

      if (absDuration < 60 * 60 * 24 * 30 * 1000) {
        units.push('d');
      }

      if (absDuration < 60 * 60 * 24 * 30 * 12 * 1000) {
        units.push('mo');
      }

      // Format duration with Persian language
      const formattedDuration = humanizeDuration(duration, {
        units,
        round: true,
        language: 'fa',
      });

      // Convert English digits to Persian digits
      const persianDuration = formattedDuration.replace(/[0-9]/g, (c: string) =>
        String.fromCharCode(c.charCodeAt(0) + 1728),
      );

      // Add "قبل" (ago) for past dates
      return duration < 0 ? `${persianDuration} قبل` : persianDuration;
    }

    // Format to Jalali with Persian locale for non-relative formats
    return date.locale('fa').format(formatString.value);
  } catch (error) {
    console.error('Error formatting Jalali date:', error);
    return null;
  }
});
</script>

<style scoped>
.jalali-formatter {
  font-family: var(
    --theme--fonts--sans--font-family,
    'Tahoma',
    'Arial',
    sans-serif
  );
  direction: rtl;
  text-align: right;
  display: inline;
}

.jalali-date {
  color: var(--theme--foreground, #333);
  font-weight: 500;
  direction: rtl;
}

.invalid-date {
  color: var(--theme--danger, #e74c3c);
  font-style: italic;
  font-size: 0.9em;
}

.no-date {
  color: var(--theme--foreground-subdued, #999);
  font-style: italic;
}
</style>
