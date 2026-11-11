export type FormType = "individual" | "institutional";

/** Open the enquiry section with a chosen form (used by buttons across the page). */
export function openEnquiry(type: FormType) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<FormType>("ark:enquiry", { detail: type }));
  const el = document.getElementById("enquire");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
