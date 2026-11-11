/**
 * Free-to-use photos from Unsplash (Unsplash License: free for commercial use, no attribution required).
 * Replace any id/URL with your own photos — any https image URL works.
 */
const u = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const photos = {
  hero: u("1758691463582-11aea602cd4a"), // smiling doctor with stethoscope
  heroSmall: u("1758691462878-6edc3d3da1be"), // doctor consulting a patient
  about1: u("1516841273335-e39b37888115"), // doctors walking in hospital corridor
  about2: u("1765896387387-0538bc9f997e"), // nurse with elderly patient
  svcIndividual: u("1622253692010-333f2da6031d"), // doctor in scrubs
  svcDelegations: u("1758691463110-697a814b2033"), // doctors reviewing a scan
  svcImmersion: u("1586773860418-d37222d8fce3"), // hospital building
  day1: u("1758691461990-03b49d969495"), // doctor writing chart
  day2: u("1519494026892-80bbd2d6fd0d"), // hospital lobby
  day3: u("1758691462651-611d730c5272"), // doctor at desk (GP)
  day4: u("1538108149393-fbbd81895907"), // private hospital room
  day5: u("1576091160550-2173dba999ef"), // laptop & stethoscope (development)
  gallery1: u("1579684385127-1ef15d508118"), // surgeons under operating light
  gallery2: u("1758575514475-2a84975db58e"), // group of nurses
  gallery3: u("1513635269975-59663e0ac1ad"), // London skyline
  gallery4: u("1758691463384-771db2f192b3"), // doctor at desk
  gallery5: u("1486299267070-83823f5448dd"), // Big Ben
  audDoctors: u("1594824476967-48c8b964273f"), // doctor in teal scrubs
  audNurses: u("1624727828489-a1e03b79bba8"), // nurse with stethoscope
  audLeaders: u("1712215544003-af10130f8eb3"), // doctor in lab coat
  london: u("1513026705753-bc3fffca8bf4"), // Tower Bridge
  cta: u("1506501139174-099022df5260"), // Thames & St Paul's
} as const;

export type PhotoKey = keyof typeof photos;
