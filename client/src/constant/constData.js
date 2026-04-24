export const NAV_ITEMS = [
  { id: "dashboard",     label: "Dashboard",     icon: "dashboard"         },
  { id: "patients",      label: "Patients",       icon: "person"            },
  { id: "doctors",       label: "Doctors",        icon: "medical_services"  },
  { id: "appointments",  label: "Appointments",   icon: "event"             },
  { id: "prescriptions", label: "Prescriptions",  icon: "description"       },
  { id: "billing",       label: "Billing",        icon: "payments"          },
  { id: "reports",       label: "Reports",        icon: "bar_chart"         },
];

export const patientNav = [
  { id: "dashboard",     label: "Dashboard",     icon: "dashboard"         },
  { id: "appointments",  label: "Appointments",   icon: "event"             },
  { id: "prescriptions", label: "Prescriptions",  icon: "description"       },
  { id: "reports",       label: "Reports",        icon: "bar_chart"         },

]

export const DOCTORS = [
  {
    id: 1,
    name: "Dr. Sarah Jenkins",
    specialty: "Senior Cardiologist",
    experience: "12 years experience",
    rating: "4.9",
    fee: "$120.00",
    availability: "Today",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkF1vvabBF8cMAbA2CavXH0Ubtt-UlbiymNYiqmM3CDIdTsiixdQ-gHkqqVLBB8x4R7FlLqJXtH6OBro2KZU7dV7fSaGmbWQ69JHxQ4zzmfXcaCzJ3j-42oLokBx-jeH5_wuVfdzv8vPZfb_TXoSU0xZcu-VGf7zqwMBPnvW_uFoWAx7cFFEumbPjvq8dhTY2Wczhruxwwc3ozI3UzWfkTuZZ7-Csb7fSsizjnwGsci45-coYw6hCrFLYrpYnBXEgPFVN9cA0WljME",
    slots: {
      0: ["09:30 AM", "11:00 AM", "02:30 PM"],
      1: ["10:00 AM", "01:00 PM"],
      3: ["09:00 AM", "11:30 AM", "03:00 PM"],
      5: ["10:30 AM", "12:00 PM"],
    },
  },
  {
    id: 2,
    name: "Dr. Marcus Thorne",
    specialty: "Neurologist",
    experience: "15 years experience",
    rating: "5.0",
    fee: "$150.00",
    availability: "Tomorrow",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJ3OlQDa0sqYB7N2YSulbzen8xCF1uKPNd26jQvaF76cjcIaeP7dRJuu6pTOLw-5NT9BP05c4IClTh8FW-rvTXNMnvhie5NuLagGHYGpj3DUJxlwZDAzKNtazm8YAdSsV1_GC8n6fzW4A-Wna3ndhiVLqmJlTWtgutnZXmnDCdylq3_Js-BBSqe3plnx9tRK0RMUHF1u0O_Wrk5AWP41FqM9u73zvoGxuRKCRTDU_qNL-kYr-aXGk9dv6WB6oFcLX8hhGWeJnORbfs",
    slots: {
      1: ["10:00 AM", "01:00 PM", "04:30 PM"],
      2: ["09:30 AM", "11:00 AM"],
      4: ["02:00 PM", "04:00 PM"],
    },
  },
  {
    id: 3,
    name: "Dr. Elena Rossi",
    specialty: "Pediatrician",
    experience: "8 years experience",
    rating: "4.8",
    fee: "$95.00",
    availability: "Today",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbDbQmSPTA3uvgWOlObGnlI3SvanEeO3s7KTB5q_4wK8WAgb3mKuV8rBBUpacp0KZ2UwcTHnDzZloJXmxOXylnyihfHAlV2Ku7CXMlRNk0fZe3pESnP2lLS6h7BjX0vIc_gnWK9zdusA5ongCRH93DxAkBGNpwZXgg6H3qeWR3zOzMBTsLPc5SrJAAI-ru0htoHbWAP3DLIOTIbp-9fxZX8f4HRBh-_7-EFQynA2S8KcEgcwx7lUTMu79IKawwPZmmSK-mp4SdQzeD",
    slots: {
      0: ["08:00 AM", "10:30 AM", "03:00 PM"],
      2: ["09:00 AM", "11:30 AM"],
      3: ["08:30 AM", "01:00 PM", "04:00 PM"],
    },
  },
  {
    id: 4,
    name: "Dr. Julian Vane",
    specialty: "Dermatologist",
    experience: "10 years experience",
    rating: "4.9",
    fee: "$110.00",
    availability: "Today",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDm3FUPtz2LWN3RnyWtXQxXPL_tky60_WQ2gfN7O5jHb8n2yLHH-30_4de-aQLedWjo36z12SKNQp9FR60WBqMvdvZW-QkrV7nnhmmuw8khdToqTiL9gQ7E0WQuKI6vLf2obysyYldobR9FSXE6RYUgLbqpThunBtnytJq8TYSlOSfBUvE4g7N8fYyTezCMfQ-6XLoQOaRnSEZPWc4NgitPFWG3HOUhkETwuDjYtm0rSsw1QaYbVWJL9IoXX0PYqmwzgsVESN-ontCW",
    slots: {
      0: ["11:30 AM", "12:30 PM", "05:00 PM"],
      1: ["10:00 AM", "02:00 PM"],
      4: ["09:00 AM", "11:00 AM", "03:30 PM"],
    },
  },
];


export const DEPARTMENTS = [
  "All Departments", "Cardiology", "Neurology",
  "Pediatrics", "Dermatology", "Orthopedics", "Oncology",
];

export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
