// Owner-editable settings. Forms stay closed until an endpoint is set here.
// Each endpoint must accept a POST of form fields and reply 2xx (Formspree,
// Basin, Getform and similar services do). Leave a value empty to keep that
// form closed: visitors see a notice and nothing is sent or stored.
window.AFSiteConfig = {
  forms: {
    newsletter: "",   // Weekly brief sign-ups
    founder: "",      // Founder story submissions and nominations
    planRequest: "",  // Custom business plan requests
    partner: ""       // Sponsors and referral partners
  }
};
