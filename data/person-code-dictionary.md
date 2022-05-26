# Data Dictionary--Persons

This is the key file of the relational database that FLHSMV uses for their crash reports.

| **No.** | **Data Element**           | **Description**                                   | **Code** | **Code description**                                             |
|---------|----------------------------|---------------------------------------------------|--|----------|------------------------------------------------------------------|
| 1       | Report Number              | 8 character DHSMV-assigned report ID              |          |                                                                  |
| 2       | Crash Year                 | Crash year (yyyy)                                 |          |                                                                  |
| 3       | Vehicle Number             | Unique number assigned to vehicle on crash report |          |                                                                  |
| 4       | Person Number              | Unique number assigned to person on crash report  |          |                                                                  |
| 5       | Driver distraction code    |                                                   | 1        | Not Distracted                                                   |
|         |                            |                                                   | 2        | Electronic Communication Devices (cell phone, etc.)              |
|         |                            |                                                   | 2        | Other Electronic Device (navigation device, DVD player)          |
|         |                            |                                                   | 4        | Other inside the Vehicle (Explain in Narrative)                  |
|         |                            |                                                   | 5        | External Distraction (outside the vehicle, Explain in Narrative) |
|         |                            |                                                   | 6        | Texting                                                          |
|         |                            |                                                   | 7        | Inattentive                                                      |
|         |                            |                                                   | 88       | Unknown                                                          |
| 6       | Condition at Time of Crash |                                                   | 1        | Apparently Normal                                                |
|         |                            |                                                   | 3        | Asleep or Fatigued                                               |
|         |                            |                                                   | 5        | Ill (sick) or Fainted                                            |
|         |                            |                                                   | 6        | Seizure, Epilepsy, Blackout                                      |
|         |                            |                                                   | 7        | Physically Impaired                                              |
|         |                            |                                                   | 8        | Emotional (depression, angry, disturbed, etc.)                   |
|         |                            |                                                   | 9        | Under the Influence of Medications/Drugs/Alcohol                 |
|         |                            |                                                   | 77       | Other (Narrative may contain clarifying information)             |
|         |                            |                                                   | 88       | Unknown                                                          |
| 7       | Zip Code                   |                                                   |          |                                                                  |
| 8       | Year of Birth              |                                                   |          |                                                                  |
| 9       | Sex                        |                                                   | 1        | Male                                                             |
|         |                            |                                                   | 2        | Female                                                           |
|         |                            |                                                   | 3        | Unknown                                                          |
| 10      | Injury severity            |                                                   | 1        | None                                                             |
|         |                            |                                                   | 2        | Possible                                                         |
|         |                            |                                                   | 3        | Non-Incapacitating                                               |
|         |                            |                                                   | 4        | Incapacitating                                                   |
|         |                            |                                                   | 5        | Fatal (within 30 days)                                           |
|         |                            |                                                   | 6        | Non-Traffic Fatality                                             |
| 11      | Driver action              |                                                   |          | 1	No Contributing Action                                                                  |
|         |                            |                                                   |          | 2	Operated MV in Carless or Negligent Manner                                                                  |
|         |                            |                                                   |          | 3	Failed to Yield Right-of-Way                                                                  |
|         |                            |                                                   |          | 4	Improper Backing                                                                  |
|         |                            |                                                   |          | 6	Improper Turn                                                                  |
|         |                            |                                                   |          | 10	Followed too Closely                                                                  |
|         |                            |                                                   |          | 11	Ran Red Light                                                                  |
|         |                            |                                                   |          | 12	Drove too Fast for Conditions                                                                  |
|         |                            |                                                   |          | 13	Ran Stop Sign                                                                  |
|         |                            |                                                   |          | 15	Improper Passing                                                                  |
|         |                            |                                                   |          | 17	Exceeded Posted Speed                                                                  |
|         |                            |                                                   |          | 21	Wrong Side of Wrong Way                                                                  |
|         |                            |                                                   |          | 25	Failed to Keep in Proper Lane                                                                  |
|         |                            |                                                   |          | 26	Ran off Roadway                                                                  |
|         |                            |                                                   |          | 27	Disregarded other Traffic Sign                                                                  |
|         |                            |                                                   |          | 28	Disregarded Other Road Markings                                                                  |
|         |                            |                                                   |          | 29	Over-Correcting/Oversteering                                                                  |
|         |                            |                                                   |          | 30	Swerved or Avoided:  Due to Wind, Slippery Surface, MV, Object, Non-Motorist in Roadway, etc.                                                                  |
|         |                            |                                                   |          | 31	Operated MV in Erratic Reckless or Aggressive Manner                                                                  |
|         |                            |                                                   |          | 77	Other Contributing Action                                                                  |