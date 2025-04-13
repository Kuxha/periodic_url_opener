// The URL you want to open every 20 minutes
const HANSHAKE_ON_CAMPUS = "https://nyu.joinhandshake.com/stu/postings?page=1&per_page=25&sort_direction=desc&sort_column=created_at&job.job_types%5B%5D=6&employers%5B%5D=416439";
const DATA_INTERN = "https://www.linkedin.com/jobs/search/?alertAction=viewjobs&currentJobId=4074992886&f_TPR=a1739256844-&origin=JOB_ALERT_EMAIL&savedSearchId=14531571252&trk=eml-email_job_alert_digest_01-job~alert-0-see~all~jobs"
const LATEST = "https://www.linkedin.com/jobs/search/?currentJobId=4190127948&distance=25&f_TPR=r3600&geoId=103644278&keywords=software%20%20intern&origin=JOB_SEARCH_PAGE_SEARCH_BUTTON&refresh=true"
const LATEST2 = "https://www.linkedin.com/jobs/search/?currentJobId=4190127948&distance=25&f_TPR=r7200&geoId=103644278&keywords=software%20%20intern&origin=JOB_SEARCH_PAGE_SEARCH_BUTTON&refresh=true"
const LATEST3= "https://www.linkedin.com/jobs/search/?currentJobId=4190127948&distance=25&f_TPR=r14400&geoId=103644278&keywords=software%20%20intern&origin=JOB_SEARCH_PAGE_SEARCH_BUTTON&refresh=true"
const AMAZON = "https://www.amazon.jobs/en/search?offset=0&result_limit=10&sort=recent&distanceType=Mi&radius=24km&latitude=38.89037&longitude=-77.03196&loc_group_id=&loc_query=united%20states&base_query=software%20intern&city=&country=USA&region=&county=&query_options=&"
const JOBRIGHT = "https://jobright.ai/jobs/recommend"
const INTERN_LIST = "https://www.intern-list.com/"
const LATEST4= "https://www.linkedin.com/jobs/search/?currentJobId=4190127948&distance=25&f_TPR=86400&geoId=103644278&keywords=software%20%20intern&origin=JOB_SEARCH_PAGE_SEARCH_BUTTON&refresh=true"
const SIMPLIFY = "https://github.com/SimplifyJobs/Summer2025-Internships"
const HANDSHAKE_INTERSHIPS = "https://nyu.joinhandshake.com/stu/postings?page=1&per_page=25&sort_direction=desc&sort_column=created_at&job.job_types%5B%5D=3"
const YC = "https://www.workatastartup.com/companies?demographic=any&hasEquity=any&hasSalary=any&industry=any&interviewProcess=any&jobType=intern&layout=list-compact&role=eng&sortBy=created_desc&tab=any&usVisaNotRequired=any"
const WELLFOUND  = "https://wellfound.com/jobs"

const ALARM_NAME = "openUrlAlarm";
const INTERVAL_MINUTES = 45; // period in 45 minutes
const DELAY_MS = 1000; // 1 seconds

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
      JOBRIGHT,
      INTERN_LIST,
      LATEST2,
      AMAZON,
      LATEST3,
      SIMPLIFY,
      LATEST4,
      HANSHAKE_ON_CAMPUS,
      DATA_INTERN,
      YC,
      WELLFOUND,
      HANDSHAKE_INTERSHIPS
    ];
    
    openUrlsSequentially(urls);
  }
});