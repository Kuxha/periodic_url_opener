// The URL you want to open every 20 minutes
const HANSHAKE_ON_CAMPUS = "https://nyu.joinhandshake.com/stu/postings?page=1&per_page=25&sort_direction=desc&sort_column=created_at&job.job_types%5B%5D=6&employers%5B%5D=416439";
const LINKEDIN_TOP_RECOMMENDED = "https://www.linkedin.com/jobs/collections/recommended/?currentJobId=4143567273&discover=recommended&discoveryOrigin=JOBS_HOME_JYMBII"
const DATA_INTERN = "https://www.linkedin.com/jobs/search/?alertAction=viewjobs&currentJobId=4074992886&f_TPR=a1739256844-&origin=JOB_ALERT_EMAIL&savedSearchId=14531571252&trk=eml-email_job_alert_digest_01-job~alert-0-see~all~jobs"
const HANDSHAKE_INTERNSHIPS = "https://nyu.joinhandshake.com/stu/postings?page=1&per_page=25&sort_direction=desc&sort_column=created_at&job.job_types%5B%5D=3&job.salary_types%5B%5D=1&job.job_applicant_preference.accepts_opt_candidates=true&job.job_applicant_preference.accepts_cpt_candidates=true&job.job_applicant_preference.willing_to_sponsor_candidate=true&preset_filters%5B%5D=individual_major_group"
const GOOGLE_INTERNSHIPS = "https://www.google.com/search?q=software+internships+new+york+in+the+last+3+days&rciv=jb&clksrc=alertsemail&hl=en&gl=US&udm=8&uds=ABqPDvzK7_emtKEDgGqKgRlezqlxz-pnuFfLi5FpxFon478p3hX3oTmgX_rwhfdPsOioI-P3CCsQREYqyzKKGJ9dLmLdJJJ0kx3ugylmomjeQs7eAqCrEnqG40r-AcPp8nphYZYJD2BnvIuwz20g7F0E_witPPPKRekPGJstLcIp4XIKsErUvmGJ3cryYELGkkgWeVRWZjk3w-SugQO09BEseMC7kj5NFRCVRJCyKNlhyJXHWOODU5yRNMpz6tArDvKFtsjSCWnzBcPKVW7ququMhk5bxVP80HJ3MZXMyL2GYLr3Lp1MPZUzXZWZOHvzcL57k9XtOi-v&jbr=sep:0"
const SIMPLIFY_GITHUB = "https://github.com/SimplifyJobs/Summer2025-Internships"
const LINKEDIN = "https://www.linkedin.com/jobs/search/?alertAction=viewjobs&currentJobId=4127868351&f_TPR=a1739256844-&geoId=103644278&keywords=intern%20&origin=JOB_SEARCH_PAGE_SEARCH_BUTTON&refresh=true&trk=eml-email_job_alert_digest_01-job~alert-0-see~all~jobs"
const LATEST = "https://www.linkedin.com/jobs/search/?alertAction=viewjobs&currentJobId=4150534422&f_EA=true&f_TPR=a1739256844-&geoId=103644278&keywords=intern%20&origin=JOB_SEARCH_PAGE_SEARCH_BUTTON&refresh=true&sortBy=R&trk=eml-email_job_alert_digest_01-job~alert-0-see~all~jobs"

const ALARM_NAME = "openUrlAlarm";
const INTERVAL_MINUTES = 45; // period in minutes
const DELAY_MS = 2000; // 2 seconds

console.log("Background script running...");

// Create or update the alarm when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed or updated. Setting up alarm...");

  // Clear any old alarms (just to be sure)
  chrome.alarms.clearAll(() => {
    // Create a new alarm that goes off every 45 minutes
    chrome.alarms.create(ALARM_NAME, { periodInMinutes: INTERVAL_MINUTES });
  });
});

// Function to open URLs with delay
function openUrlsSequentially(urls) {
  urls.forEach((url, index) => {
    setTimeout(() => {
      console.log(`Opening: ${url}`);
      chrome.tabs.create({ url });
    }, index * DELAY_MS);
  });
}

// Listen for the alarm event
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM_NAME) {
    console.log("Alarm triggered! Opening URLs sequentially...");
    
    const urls = [
      LATEST,
      LINKEDIN,
      DATA_INTERN,
      HANDSHAKE_INTERNSHIPS,
      GOOGLE_INTERNSHIPS,
      SIMPLIFY_GITHUB,
      LINKEDIN_TOP_RECOMMENDED,
      HANSHAKE_ON_CAMPUS
    ];
    
    openUrlsSequentially(urls);
  }
});