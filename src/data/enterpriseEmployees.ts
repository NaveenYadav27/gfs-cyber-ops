import { Employee } from '@/types/enterprise';

export const enterpriseEmployees: Employee[] = [
  {
    "id": "emp-001",
    "employeeId": "GFS-0001",
    "name": "Pallavi Singh",
    "designation": "Board of Directors",
    "department": "Board",
    "division": "Executive",
    "businessUnit": "Corporate",
    "manager": null,
    "directReports": [
      "emp-002"
    ],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 5",
    "seat": "S-292",
    "email": "pallavi.singh@gfs.com",
    "phone": "+91-9820645375",
    "teamsId": "pallavi.singh@gfs.onmicrosoft.com",
    "laptop": "LPT-6267",
    "desktop": "DSK-9126",
    "vpn": "VPN-937",
    "activeDirectory": "AD\\pallavi.singh",
    "entraId": "usr_90662",
    "photo": "https://ui-avatars.com/api/?name=pallavi+singh&background=random",
    "joinedDate": "2019-08-19",
    "yearsOfExperience": 14,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "morning",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "GCP",
      "Python",
      "Bash",
      "Powershell"
    ],
    "certifications": [
      "CISSP",
      "GCIH"
    ],
    "projects": [
      "PRJ-828"
    ],
    "currentWorkload": 59,
    "currentCases": [],
    "currentIncidents": [
      "INC-8664"
    ],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-349"
    ],
    "assignedAssets": [
      "AST-2523"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "offline",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "privileged",
    "level": 10,
    "salaryBand": "Band A",
    "bio": "Experienced Board of Directors specialized in Cyber Defense.",
    "performance": "Meets Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 10,
    "promotionReadiness": "1-2 years",
    "aiReadiness": "High",
    "knowledgeContributions": 33,
    "documents": [],
    "reports": [],
    "leaveBalance": 19,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-002",
    "employeeId": "GFS-0002",
    "name": "Suresh Reddy",
    "designation": "Chief Executive Officer",
    "department": "Executive",
    "division": "Executive",
    "businessUnit": "Corporate",
    "manager": "emp-001",
    "directReports": [
      "emp-003"
    ],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 1",
    "seat": "S-641",
    "email": "suresh.reddy@gfs.com",
    "phone": "+91-9872148231",
    "teamsId": "suresh.reddy@gfs.onmicrosoft.com",
    "laptop": "LPT-2909",
    "desktop": "DSK-8690",
    "vpn": "VPN-994",
    "activeDirectory": "AD\\suresh.reddy",
    "entraId": "usr_58697",
    "photo": "https://ui-avatars.com/api/?name=suresh+reddy&background=random",
    "joinedDate": "2018-04-26",
    "yearsOfExperience": 8,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "evening",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "CrowdStrike",
      "Azure Sentinel",
      "AWS",
      "KQL"
    ],
    "certifications": [
      "GCFA",
      "Azure SC-200"
    ],
    "projects": [
      "PRJ-801"
    ],
    "currentWorkload": 37,
    "currentCases": [
      "CASE-1319"
    ],
    "currentIncidents": [
      "INC-9075"
    ],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-172"
    ],
    "assignedAssets": [
      "AST-8130"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "offline",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": true,
    "securityClearance": "privileged",
    "level": 9,
    "salaryBand": "Band A",
    "bio": "Experienced Chief Executive Officer specialized in Cyber Defense.",
    "performance": "Meets Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 10,
    "promotionReadiness": "Ready now",
    "aiReadiness": "Low",
    "knowledgeContributions": 5,
    "documents": [],
    "reports": [],
    "leaveBalance": 10,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-003",
    "employeeId": "GFS-0003",
    "name": "Vishal Mehta",
    "designation": "Chief Information Officer",
    "department": "IT",
    "division": "Executive",
    "businessUnit": "Corporate",
    "manager": "emp-002",
    "directReports": [
      "emp-004"
    ],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 6",
    "seat": "S-357",
    "email": "vishal.mehta@gfs.com",
    "phone": "+91-9852293657",
    "teamsId": "vishal.mehta@gfs.onmicrosoft.com",
    "laptop": "LPT-8389",
    "desktop": null,
    "vpn": "VPN-274",
    "activeDirectory": "AD\\vishal.mehta",
    "entraId": "usr_25163",
    "photo": "https://ui-avatars.com/api/?name=vishal+mehta&background=random",
    "joinedDate": "2018-01-16",
    "yearsOfExperience": 9,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "evening",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Powershell",
      "Wireshark",
      "KQL",
      "Splunk"
    ],
    "certifications": [
      "Azure SC-200",
      "CISSP"
    ],
    "projects": [
      "PRJ-363"
    ],
    "currentWorkload": 81,
    "currentCases": [],
    "currentIncidents": [],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-508"
    ],
    "assignedAssets": [
      "AST-9102"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "offline",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": true,
    "securityClearance": "privileged",
    "level": 8,
    "salaryBand": "Band B",
    "bio": "Experienced Chief Information Officer specialized in Cyber Defense.",
    "performance": "Exceeds Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 30,
    "promotionReadiness": "Ready now",
    "aiReadiness": "Medium",
    "knowledgeContributions": 30,
    "documents": [],
    "reports": [],
    "leaveBalance": 7,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-004",
    "employeeId": "GFS-0004",
    "name": "Deepak Nanda",
    "designation": "Chief Information Security Officer",
    "department": "Cyber Security",
    "division": "Executive",
    "businessUnit": "Corporate",
    "manager": "emp-003",
    "directReports": [
      "emp-005"
    ],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 9",
    "seat": "S-826",
    "email": "deepak.nanda@gfs.com",
    "phone": "+91-9817587907",
    "teamsId": "deepak.nanda@gfs.onmicrosoft.com",
    "laptop": "LPT-3419",
    "desktop": null,
    "vpn": "VPN-300",
    "activeDirectory": "AD\\deepak.nanda",
    "entraId": "usr_82139",
    "photo": "https://ui-avatars.com/api/?name=deepak+nanda&background=random",
    "joinedDate": "2021-08-04",
    "yearsOfExperience": 9,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "general",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "KQL",
      "BurpSuite",
      "AWS",
      "Bash"
    ],
    "certifications": [
      "GCFA",
      "Azure SC-200"
    ],
    "projects": [
      "PRJ-330"
    ],
    "currentWorkload": 79,
    "currentCases": [],
    "currentIncidents": [
      "INC-2653"
    ],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-695"
    ],
    "assignedAssets": [
      "AST-9798"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "in-meeting",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "privileged",
    "level": 8,
    "salaryBand": "Band B",
    "bio": "Experienced Chief Information Security Officer specialized in Cyber Defense.",
    "performance": "Exceptional",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 48,
    "promotionReadiness": "Ready now",
    "aiReadiness": "High",
    "knowledgeContributions": 42,
    "documents": [],
    "reports": [],
    "leaveBalance": 21,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-005",
    "employeeId": "GFS-0005",
    "name": "Tarun Saxena",
    "designation": "Deputy CISO",
    "department": "Cyber Security",
    "division": "Leadership",
    "businessUnit": "Corporate",
    "manager": "emp-004",
    "directReports": [
      "emp-006",
      "emp-027",
      "emp-028",
      "emp-034",
      "emp-035",
      "emp-040",
      "emp-041",
      "emp-047",
      "emp-048",
      "emp-049",
      "emp-050",
      "emp-051",
      "emp-052",
      "emp-053",
      "emp-054",
      "emp-055",
      "emp-056"
    ],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 4",
    "seat": "S-286",
    "email": "tarun.saxena@gfs.com",
    "phone": "+91-9855505192",
    "teamsId": "tarun.saxena@gfs.onmicrosoft.com",
    "laptop": "LPT-4804",
    "desktop": "DSK-5361",
    "vpn": "VPN-507",
    "activeDirectory": "AD\\tarun.saxena",
    "entraId": "usr_22642",
    "photo": "https://ui-avatars.com/api/?name=tarun+saxena&background=random",
    "joinedDate": "2021-05-20",
    "yearsOfExperience": 8,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "night",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Splunk",
      "Bash",
      "AWS",
      "GCP"
    ],
    "certifications": [
      "CISSP",
      "AWS Security"
    ],
    "projects": [
      "PRJ-521"
    ],
    "currentWorkload": 47,
    "currentCases": [
      "CASE-1706"
    ],
    "currentIncidents": [
      "INC-5451"
    ],
    "currentInvestigations": [
      "INV-2659"
    ],
    "currentDevices": [
      "DEV-245"
    ],
    "assignedAssets": [
      "AST-7626"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "away",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "privileged",
    "level": 7,
    "salaryBand": "Band C",
    "bio": "Experienced Deputy CISO specialized in Cyber Defense.",
    "performance": "Meets Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 60,
    "promotionReadiness": "Ready now",
    "aiReadiness": "Medium",
    "knowledgeContributions": 14,
    "documents": [],
    "reports": [],
    "leaveBalance": 15,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-006",
    "employeeId": "GFS-0006",
    "name": "Ankit Bansal",
    "designation": "SOC Director",
    "department": "Cyber Defense",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-005",
    "directReports": [
      "emp-007",
      "emp-008"
    ],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 4",
    "seat": "S-201",
    "email": "ankit.bansal@gfs.com",
    "phone": "+91-9889865658",
    "teamsId": "ankit.bansal@gfs.onmicrosoft.com",
    "laptop": "LPT-5054",
    "desktop": null,
    "vpn": "VPN-759",
    "activeDirectory": "AD\\ankit.bansal",
    "entraId": "usr_89954",
    "photo": "https://ui-avatars.com/api/?name=ankit+bansal&background=random",
    "joinedDate": "2022-02-02",
    "yearsOfExperience": 7,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "general",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Bash",
      "Powershell",
      "AWS",
      "Splunk"
    ],
    "certifications": [
      "CISM",
      "GCFA"
    ],
    "projects": [
      "PRJ-547"
    ],
    "currentWorkload": 39,
    "currentCases": [],
    "currentIncidents": [
      "INC-1959"
    ],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-532"
    ],
    "assignedAssets": [
      "AST-7797"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "in-meeting",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "privileged",
    "level": 6,
    "salaryBand": "Band D",
    "bio": "Experienced SOC Director specialized in Cyber Defense.",
    "performance": "Exceeds Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 34,
    "promotionReadiness": "Ready now",
    "aiReadiness": "High",
    "knowledgeContributions": 12,
    "documents": [],
    "reports": [],
    "leaveBalance": 25,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-007",
    "employeeId": "GFS-0007",
    "name": "Aditi Rao",
    "designation": "SOC Manager - Shift A",
    "department": "Cyber Defense",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-006",
    "directReports": [
      "emp-009",
      "emp-010",
      "emp-013",
      "emp-014",
      "emp-015",
      "emp-019",
      "emp-020",
      "emp-021",
      "emp-022"
    ],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 2",
    "seat": "S-245",
    "email": "aditi.rao@gfs.com",
    "phone": "+91-9839332058",
    "teamsId": "aditi.rao@gfs.onmicrosoft.com",
    "laptop": "LPT-3192",
    "desktop": null,
    "vpn": "VPN-210",
    "activeDirectory": "AD\\aditi.rao",
    "entraId": "usr_78675",
    "photo": "https://ui-avatars.com/api/?name=aditi+rao&background=random",
    "joinedDate": "2015-09-29",
    "yearsOfExperience": 3,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "morning",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "AWS",
      "Azure Sentinel",
      "BurpSuite",
      "KQL"
    ],
    "certifications": [
      "GCIH",
      "AWS Security"
    ],
    "projects": [
      "PRJ-268"
    ],
    "currentWorkload": 79,
    "currentCases": [],
    "currentIncidents": [
      "INC-2459"
    ],
    "currentInvestigations": [
      "INV-8832"
    ],
    "currentDevices": [
      "DEV-424"
    ],
    "assignedAssets": [
      "AST-7057"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "offline",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "elevated",
    "level": 5,
    "salaryBand": "Band E",
    "bio": "Experienced SOC Manager - Shift A specialized in Cyber Defense.",
    "performance": "Meets Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 72,
    "promotionReadiness": "Ready now",
    "aiReadiness": "Low",
    "knowledgeContributions": 8,
    "documents": [],
    "reports": [],
    "leaveBalance": 20,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-008",
    "employeeId": "GFS-0008",
    "name": "Mohit Ahuja",
    "designation": "SOC Manager - Shift B",
    "department": "Cyber Defense",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-006",
    "directReports": [
      "emp-011",
      "emp-012",
      "emp-016",
      "emp-017",
      "emp-018",
      "emp-023",
      "emp-024",
      "emp-025",
      "emp-026"
    ],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 8",
    "seat": "S-480",
    "email": "mohit.ahuja@gfs.com",
    "phone": "+91-9849275204",
    "teamsId": "mohit.ahuja@gfs.onmicrosoft.com",
    "laptop": "LPT-6160",
    "desktop": null,
    "vpn": "VPN-599",
    "activeDirectory": "AD\\mohit.ahuja",
    "entraId": "usr_54941",
    "photo": "https://ui-avatars.com/api/?name=mohit+ahuja&background=random",
    "joinedDate": "2021-06-21",
    "yearsOfExperience": 11,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "morning",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Azure Sentinel",
      "Powershell",
      "CrowdStrike",
      "Wireshark"
    ],
    "certifications": [
      "Azure SC-200",
      "CISM"
    ],
    "projects": [
      "PRJ-514"
    ],
    "currentWorkload": 53,
    "currentCases": [],
    "currentIncidents": [
      "INC-9114"
    ],
    "currentInvestigations": [
      "INV-2408"
    ],
    "currentDevices": [
      "DEV-889"
    ],
    "assignedAssets": [
      "AST-2815"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "active",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": true,
    "securityClearance": "elevated",
    "level": 5,
    "salaryBand": "Band E",
    "bio": "Experienced SOC Manager - Shift B specialized in Cyber Defense.",
    "performance": "Exceeds Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 15,
    "promotionReadiness": "Ready now",
    "aiReadiness": "High",
    "knowledgeContributions": 27,
    "documents": [],
    "reports": [],
    "leaveBalance": 10,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-009",
    "employeeId": "GFS-0009",
    "name": "Ritu Jain",
    "designation": "Senior SOC Analyst",
    "department": "Cyber Defense",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-007",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 6",
    "seat": "S-598",
    "email": "ritu.jain@gfs.com",
    "phone": "+91-9824612282",
    "teamsId": "ritu.jain@gfs.onmicrosoft.com",
    "laptop": "LPT-2730",
    "desktop": null,
    "vpn": "VPN-490",
    "activeDirectory": "AD\\ritu.jain",
    "entraId": "usr_60064",
    "photo": "https://ui-avatars.com/api/?name=ritu+jain&background=random",
    "joinedDate": "2018-01-27",
    "yearsOfExperience": 12,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "morning",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Powershell",
      "KQL",
      "BurpSuite",
      "Wireshark"
    ],
    "certifications": [
      "AWS Security",
      "CISSP"
    ],
    "projects": [
      "PRJ-971"
    ],
    "currentWorkload": 64,
    "currentCases": [],
    "currentIncidents": [],
    "currentInvestigations": [
      "INV-9111"
    ],
    "currentDevices": [
      "DEV-245"
    ],
    "assignedAssets": [
      "AST-8546"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "active",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": true,
    "securityClearance": "elevated",
    "level": 4,
    "salaryBand": "Band F",
    "bio": "Experienced Senior SOC Analyst specialized in Cyber Defense.",
    "performance": "Exceptional",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 79,
    "promotionReadiness": "1-2 years",
    "aiReadiness": "Low",
    "knowledgeContributions": 22,
    "documents": [],
    "reports": [],
    "leaveBalance": 26,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-010",
    "employeeId": "GFS-0010",
    "name": "Kriti Verma",
    "designation": "Senior SOC Analyst",
    "department": "Cyber Defense",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-007",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 6",
    "seat": "S-134",
    "email": "kriti.verma@gfs.com",
    "phone": "+91-9840073526",
    "teamsId": "kriti.verma@gfs.onmicrosoft.com",
    "laptop": "LPT-5245",
    "desktop": "DSK-1942",
    "vpn": "VPN-774",
    "activeDirectory": "AD\\kriti.verma",
    "entraId": "usr_21504",
    "photo": "https://ui-avatars.com/api/?name=kriti+verma&background=random",
    "joinedDate": "2019-04-05",
    "yearsOfExperience": 6,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "evening",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Splunk",
      "BurpSuite",
      "Wireshark",
      "CrowdStrike"
    ],
    "certifications": [
      "CISM",
      "Azure SC-200"
    ],
    "projects": [
      "PRJ-168"
    ],
    "currentWorkload": 66,
    "currentCases": [
      "CASE-9448"
    ],
    "currentIncidents": [
      "INC-8375"
    ],
    "currentInvestigations": [
      "INV-3045"
    ],
    "currentDevices": [
      "DEV-765"
    ],
    "assignedAssets": [
      "AST-6684"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "active",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "elevated",
    "level": 4,
    "salaryBand": "Band F",
    "bio": "Experienced Senior SOC Analyst specialized in Cyber Defense.",
    "performance": "Exceptional",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 22,
    "promotionReadiness": "Ready now",
    "aiReadiness": "High",
    "knowledgeContributions": 46,
    "documents": [],
    "reports": [],
    "leaveBalance": 18,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-011",
    "employeeId": "GFS-0011",
    "name": "Aarti Shetty",
    "designation": "Senior SOC Analyst",
    "department": "Cyber Defense",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-008",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 6",
    "seat": "S-352",
    "email": "aarti.shetty@gfs.com",
    "phone": "+91-9841436564",
    "teamsId": "aarti.shetty@gfs.onmicrosoft.com",
    "laptop": "LPT-2414",
    "desktop": null,
    "vpn": "VPN-801",
    "activeDirectory": "AD\\aarti.shetty",
    "entraId": "usr_52673",
    "photo": "https://ui-avatars.com/api/?name=aarti+shetty&background=random",
    "joinedDate": "2021-07-09",
    "yearsOfExperience": 11,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "general",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "AWS",
      "Splunk",
      "Python",
      "Azure Sentinel"
    ],
    "certifications": [
      "OSCP",
      "GCIH"
    ],
    "projects": [
      "PRJ-690"
    ],
    "currentWorkload": 94,
    "currentCases": [
      "CASE-4891"
    ],
    "currentIncidents": [],
    "currentInvestigations": [
      "INV-1417"
    ],
    "currentDevices": [
      "DEV-406"
    ],
    "assignedAssets": [
      "AST-6313"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "active",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": true,
    "securityClearance": "elevated",
    "level": 4,
    "salaryBand": "Band F",
    "bio": "Experienced Senior SOC Analyst specialized in Cyber Defense.",
    "performance": "Exceptional",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 35,
    "promotionReadiness": "Ready now",
    "aiReadiness": "High",
    "knowledgeContributions": 13,
    "documents": [],
    "reports": [],
    "leaveBalance": 23,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-012",
    "employeeId": "GFS-0012",
    "name": "Manish Tiwari",
    "designation": "Senior SOC Analyst",
    "department": "Cyber Defense",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-008",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 9",
    "seat": "S-498",
    "email": "manish.tiwari@gfs.com",
    "phone": "+91-9822050555",
    "teamsId": "manish.tiwari@gfs.onmicrosoft.com",
    "laptop": "LPT-8284",
    "desktop": null,
    "vpn": "VPN-696",
    "activeDirectory": "AD\\manish.tiwari",
    "entraId": "usr_59980",
    "photo": "https://ui-avatars.com/api/?name=manish+tiwari&background=random",
    "joinedDate": "2025-03-24",
    "yearsOfExperience": 6,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "general",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Python",
      "Splunk",
      "KQL",
      "GCP"
    ],
    "certifications": [
      "GCFA",
      "GCIH"
    ],
    "projects": [
      "PRJ-441"
    ],
    "currentWorkload": 66,
    "currentCases": [
      "CASE-9681"
    ],
    "currentIncidents": [],
    "currentInvestigations": [
      "INV-4909"
    ],
    "currentDevices": [
      "DEV-391"
    ],
    "assignedAssets": [
      "AST-9362"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "in-meeting",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "elevated",
    "level": 4,
    "salaryBand": "Band F",
    "bio": "Experienced Senior SOC Analyst specialized in Cyber Defense.",
    "performance": "Exceeds Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 58,
    "promotionReadiness": "Ready now",
    "aiReadiness": "High",
    "knowledgeContributions": 38,
    "documents": [],
    "reports": [],
    "leaveBalance": 30,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-013",
    "employeeId": "GFS-0013",
    "name": "Karthik Krishnan",
    "designation": "Tier 2 SOC Analyst",
    "department": "Cyber Defense",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-007",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 1",
    "seat": "S-946",
    "email": "karthik.krishnan@gfs.com",
    "phone": "+91-9831759429",
    "teamsId": "karthik.krishnan@gfs.onmicrosoft.com",
    "laptop": "LPT-5218",
    "desktop": "DSK-6409",
    "vpn": "VPN-124",
    "activeDirectory": "AD\\karthik.krishnan",
    "entraId": "usr_73009",
    "photo": "https://ui-avatars.com/api/?name=karthik+krishnan&background=random",
    "joinedDate": "2024-08-09",
    "yearsOfExperience": 12,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "night",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "BurpSuite",
      "CrowdStrike",
      "GCP",
      "Bash"
    ],
    "certifications": [
      "AWS Security",
      "OSCP"
    ],
    "projects": [
      "PRJ-392"
    ],
    "currentWorkload": 58,
    "currentCases": [
      "CASE-4714"
    ],
    "currentIncidents": [],
    "currentInvestigations": [
      "INV-7798"
    ],
    "currentDevices": [
      "DEV-830"
    ],
    "assignedAssets": [
      "AST-7755"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "away",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": true,
    "securityClearance": "standard",
    "level": 3,
    "salaryBand": "Band G",
    "bio": "Experienced Tier 2 SOC Analyst specialized in Cyber Defense.",
    "performance": "Exceeds Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 62,
    "promotionReadiness": "Ready now",
    "aiReadiness": "High",
    "knowledgeContributions": 33,
    "documents": [],
    "reports": [],
    "leaveBalance": 30,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-014",
    "employeeId": "GFS-0014",
    "name": "Shruti Choudhury",
    "designation": "Tier 2 SOC Analyst",
    "department": "Cyber Defense",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-007",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 9",
    "seat": "S-279",
    "email": "shruti.choudhury@gfs.com",
    "phone": "+91-9848567523",
    "teamsId": "shruti.choudhury@gfs.onmicrosoft.com",
    "laptop": "LPT-6152",
    "desktop": null,
    "vpn": "VPN-107",
    "activeDirectory": "AD\\shruti.choudhury",
    "entraId": "usr_13830",
    "photo": "https://ui-avatars.com/api/?name=shruti+choudhury&background=random",
    "joinedDate": "2019-12-30",
    "yearsOfExperience": 7,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "general",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "BurpSuite",
      "GCP",
      "KQL",
      "CrowdStrike"
    ],
    "certifications": [
      "AWS Security",
      "Azure SC-200"
    ],
    "projects": [
      "PRJ-582"
    ],
    "currentWorkload": 77,
    "currentCases": [
      "CASE-5184"
    ],
    "currentIncidents": [],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-333"
    ],
    "assignedAssets": [
      "AST-1437"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "active",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "standard",
    "level": 3,
    "salaryBand": "Band G",
    "bio": "Experienced Tier 2 SOC Analyst specialized in Cyber Defense.",
    "performance": "Exceeds Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 34,
    "promotionReadiness": "Ready now",
    "aiReadiness": "Medium",
    "knowledgeContributions": 27,
    "documents": [],
    "reports": [],
    "leaveBalance": 14,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-015",
    "employeeId": "GFS-0015",
    "name": "Harsha Vardhan",
    "designation": "Tier 2 SOC Analyst",
    "department": "Cyber Defense",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-007",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 5",
    "seat": "S-107",
    "email": "harsha.vardhan@gfs.com",
    "phone": "+91-9877963793",
    "teamsId": "harsha.vardhan@gfs.onmicrosoft.com",
    "laptop": "LPT-6266",
    "desktop": null,
    "vpn": "VPN-392",
    "activeDirectory": "AD\\harsha.vardhan",
    "entraId": "usr_29274",
    "photo": "https://ui-avatars.com/api/?name=harsha+vardhan&background=random",
    "joinedDate": "2019-01-21",
    "yearsOfExperience": 11,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "night",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Splunk",
      "Azure Sentinel",
      "Python",
      "Powershell"
    ],
    "certifications": [
      "OSCP",
      "GCIH"
    ],
    "projects": [
      "PRJ-862"
    ],
    "currentWorkload": 77,
    "currentCases": [
      "CASE-3760"
    ],
    "currentIncidents": [],
    "currentInvestigations": [
      "INV-9113"
    ],
    "currentDevices": [
      "DEV-586"
    ],
    "assignedAssets": [
      "AST-5913"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "in-meeting",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": true,
    "securityClearance": "standard",
    "level": 3,
    "salaryBand": "Band G",
    "bio": "Experienced Tier 2 SOC Analyst specialized in Cyber Defense.",
    "performance": "Exceptional",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 100,
    "promotionReadiness": "1-2 years",
    "aiReadiness": "High",
    "knowledgeContributions": 3,
    "documents": [],
    "reports": [],
    "leaveBalance": 16,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-016",
    "employeeId": "GFS-0016",
    "name": "Gaurav Chawla",
    "designation": "Tier 2 SOC Analyst",
    "department": "Cyber Defense",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-008",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 9",
    "seat": "S-888",
    "email": "gaurav.chawla@gfs.com",
    "phone": "+91-9873704253",
    "teamsId": "gaurav.chawla@gfs.onmicrosoft.com",
    "laptop": "LPT-8815",
    "desktop": "DSK-6269",
    "vpn": "VPN-807",
    "activeDirectory": "AD\\gaurav.chawla",
    "entraId": "usr_24632",
    "photo": "https://ui-avatars.com/api/?name=gaurav+chawla&background=random",
    "joinedDate": "2024-09-04",
    "yearsOfExperience": 7,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "general",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Bash",
      "GCP",
      "Python",
      "Wireshark"
    ],
    "certifications": [
      "CEH",
      "CISSP"
    ],
    "projects": [
      "PRJ-636"
    ],
    "currentWorkload": 43,
    "currentCases": [],
    "currentIncidents": [
      "INC-8716"
    ],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-239"
    ],
    "assignedAssets": [
      "AST-5552"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "offline",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "standard",
    "level": 3,
    "salaryBand": "Band G",
    "bio": "Experienced Tier 2 SOC Analyst specialized in Cyber Defense.",
    "performance": "Exceeds Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 38,
    "promotionReadiness": "Ready now",
    "aiReadiness": "High",
    "knowledgeContributions": 4,
    "documents": [],
    "reports": [],
    "leaveBalance": 22,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-017",
    "employeeId": "GFS-0017",
    "name": "Priya Nair",
    "designation": "Tier 2 SOC Analyst",
    "department": "Cyber Defense",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-008",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 4",
    "seat": "S-900",
    "email": "priya.nair@gfs.com",
    "phone": "+91-9838572261",
    "teamsId": "priya.nair@gfs.onmicrosoft.com",
    "laptop": "LPT-9290",
    "desktop": null,
    "vpn": "VPN-100",
    "activeDirectory": "AD\\priya.nair",
    "entraId": "usr_76525",
    "photo": "https://ui-avatars.com/api/?name=priya+nair&background=random",
    "joinedDate": "2020-04-14",
    "yearsOfExperience": 6,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "night",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "BurpSuite",
      "AWS",
      "Azure Sentinel",
      "KQL"
    ],
    "certifications": [
      "Azure SC-200",
      "CISSP"
    ],
    "projects": [
      "PRJ-618"
    ],
    "currentWorkload": 36,
    "currentCases": [
      "CASE-6051"
    ],
    "currentIncidents": [
      "INC-8718"
    ],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-740"
    ],
    "assignedAssets": [
      "AST-2620"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "active",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": true,
    "securityClearance": "standard",
    "level": 3,
    "salaryBand": "Band G",
    "bio": "Experienced Tier 2 SOC Analyst specialized in Cyber Defense.",
    "performance": "Meets Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 80,
    "promotionReadiness": "1-2 years",
    "aiReadiness": "High",
    "knowledgeContributions": 29,
    "documents": [],
    "reports": [],
    "leaveBalance": 21,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-018",
    "employeeId": "GFS-0018",
    "name": "Kiran Thakur",
    "designation": "Tier 2 SOC Analyst",
    "department": "Cyber Defense",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-008",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 3",
    "seat": "S-678",
    "email": "kiran.thakur@gfs.com",
    "phone": "+91-9877495667",
    "teamsId": "kiran.thakur@gfs.onmicrosoft.com",
    "laptop": "LPT-1592",
    "desktop": null,
    "vpn": "VPN-105",
    "activeDirectory": "AD\\kiran.thakur",
    "entraId": "usr_88417",
    "photo": "https://ui-avatars.com/api/?name=kiran+thakur&background=random",
    "joinedDate": "2018-09-12",
    "yearsOfExperience": 11,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "evening",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "AWS",
      "KQL",
      "BurpSuite",
      "Bash"
    ],
    "certifications": [
      "OSCP",
      "AWS Security"
    ],
    "projects": [
      "PRJ-668"
    ],
    "currentWorkload": 49,
    "currentCases": [
      "CASE-8862"
    ],
    "currentIncidents": [],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-768"
    ],
    "assignedAssets": [
      "AST-3508"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "in-meeting",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "standard",
    "level": 3,
    "salaryBand": "Band G",
    "bio": "Experienced Tier 2 SOC Analyst specialized in Cyber Defense.",
    "performance": "Exceptional",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 24,
    "promotionReadiness": "2-3 years",
    "aiReadiness": "Medium",
    "knowledgeContributions": 9,
    "documents": [],
    "reports": [],
    "leaveBalance": 10,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-019",
    "employeeId": "GFS-0019",
    "name": "Tara Pillai",
    "designation": "Tier 1 SOC Analyst",
    "department": "Cyber Defense",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-007",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 1",
    "seat": "S-178",
    "email": "tara.pillai@gfs.com",
    "phone": "+91-9855411003",
    "teamsId": "tara.pillai@gfs.onmicrosoft.com",
    "laptop": "LPT-3669",
    "desktop": "DSK-9071",
    "vpn": "VPN-166",
    "activeDirectory": "AD\\tara.pillai",
    "entraId": "usr_65720",
    "photo": "https://ui-avatars.com/api/?name=tara+pillai&background=random",
    "joinedDate": "2021-06-13",
    "yearsOfExperience": 15,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "morning",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Powershell",
      "Python",
      "Wireshark",
      "Splunk"
    ],
    "certifications": [
      "CISM",
      "GCIH"
    ],
    "projects": [
      "PRJ-379"
    ],
    "currentWorkload": 72,
    "currentCases": [],
    "currentIncidents": [],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-807"
    ],
    "assignedAssets": [
      "AST-4890"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "offline",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "standard",
    "level": 2,
    "salaryBand": "Band H",
    "bio": "Experienced Tier 1 SOC Analyst specialized in Cyber Defense.",
    "performance": "Meets Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 28,
    "promotionReadiness": "2-3 years",
    "aiReadiness": "Medium",
    "knowledgeContributions": 8,
    "documents": [],
    "reports": [],
    "leaveBalance": 21,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-020",
    "employeeId": "GFS-0020",
    "name": "Nikhil Bhatia",
    "designation": "Tier 1 SOC Analyst",
    "department": "Cyber Defense",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-007",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 7",
    "seat": "S-310",
    "email": "nikhil.bhatia@gfs.com",
    "phone": "+91-9891229105",
    "teamsId": "nikhil.bhatia@gfs.onmicrosoft.com",
    "laptop": "LPT-7672",
    "desktop": null,
    "vpn": "VPN-306",
    "activeDirectory": "AD\\nikhil.bhatia",
    "entraId": "usr_29955",
    "photo": "https://ui-avatars.com/api/?name=nikhil+bhatia&background=random",
    "joinedDate": "2018-11-05",
    "yearsOfExperience": 2,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "evening",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Python",
      "KQL",
      "Splunk",
      "BurpSuite"
    ],
    "certifications": [
      "OSCP",
      "GCIH"
    ],
    "projects": [
      "PRJ-897"
    ],
    "currentWorkload": 74,
    "currentCases": [
      "CASE-2208"
    ],
    "currentIncidents": [],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-664"
    ],
    "assignedAssets": [
      "AST-8511"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "in-meeting",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": true,
    "securityClearance": "standard",
    "level": 2,
    "salaryBand": "Band H",
    "bio": "Experienced Tier 1 SOC Analyst specialized in Cyber Defense.",
    "performance": "Exceeds Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 100,
    "promotionReadiness": "1-2 years",
    "aiReadiness": "Medium",
    "knowledgeContributions": 29,
    "documents": [],
    "reports": [],
    "leaveBalance": 17,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-021",
    "employeeId": "GFS-0021",
    "name": "Kavita Iyer",
    "designation": "Tier 1 SOC Analyst",
    "department": "Cyber Defense",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-007",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 10",
    "seat": "S-382",
    "email": "kavita.iyer@gfs.com",
    "phone": "+91-9834892457",
    "teamsId": "kavita.iyer@gfs.onmicrosoft.com",
    "laptop": "LPT-4125",
    "desktop": null,
    "vpn": "VPN-789",
    "activeDirectory": "AD\\kavita.iyer",
    "entraId": "usr_42856",
    "photo": "https://ui-avatars.com/api/?name=kavita+iyer&background=random",
    "joinedDate": "2019-12-15",
    "yearsOfExperience": 11,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "night",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "KQL",
      "Python",
      "Splunk",
      "Powershell"
    ],
    "certifications": [
      "Azure SC-200",
      "GCFA"
    ],
    "projects": [
      "PRJ-249"
    ],
    "currentWorkload": 39,
    "currentCases": [
      "CASE-8749"
    ],
    "currentIncidents": [
      "INC-3340"
    ],
    "currentInvestigations": [
      "INV-2748"
    ],
    "currentDevices": [
      "DEV-438"
    ],
    "assignedAssets": [
      "AST-6208"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "active",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "standard",
    "level": 2,
    "salaryBand": "Band H",
    "bio": "Experienced Tier 1 SOC Analyst specialized in Cyber Defense.",
    "performance": "Exceptional",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 68,
    "promotionReadiness": "1-2 years",
    "aiReadiness": "High",
    "knowledgeContributions": 9,
    "documents": [],
    "reports": [],
    "leaveBalance": 6,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-022",
    "employeeId": "GFS-0022",
    "name": "Rajeev Kumar",
    "designation": "Tier 1 SOC Analyst",
    "department": "Cyber Defense",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-007",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 4",
    "seat": "S-502",
    "email": "rajeev.kumar@gfs.com",
    "phone": "+91-9869446073",
    "teamsId": "rajeev.kumar@gfs.onmicrosoft.com",
    "laptop": "LPT-3261",
    "desktop": null,
    "vpn": "VPN-920",
    "activeDirectory": "AD\\rajeev.kumar",
    "entraId": "usr_70942",
    "photo": "https://ui-avatars.com/api/?name=rajeev+kumar&background=random",
    "joinedDate": "2018-02-15",
    "yearsOfExperience": 3,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "night",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "BurpSuite",
      "CrowdStrike",
      "Bash",
      "Wireshark"
    ],
    "certifications": [
      "GCIH",
      "Azure SC-200"
    ],
    "projects": [
      "PRJ-809"
    ],
    "currentWorkload": 53,
    "currentCases": [],
    "currentIncidents": [
      "INC-4579"
    ],
    "currentInvestigations": [
      "INV-6015"
    ],
    "currentDevices": [
      "DEV-229"
    ],
    "assignedAssets": [
      "AST-1661"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "away",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "standard",
    "level": 2,
    "salaryBand": "Band H",
    "bio": "Experienced Tier 1 SOC Analyst specialized in Cyber Defense.",
    "performance": "Meets Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 40,
    "promotionReadiness": "1-2 years",
    "aiReadiness": "Low",
    "knowledgeContributions": 47,
    "documents": [],
    "reports": [],
    "leaveBalance": 16,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-023",
    "employeeId": "GFS-0023",
    "name": "Naveen K Yadav",
    "designation": "Tier 1 SOC Analyst",
    "department": "Cyber Defense",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-008",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 2",
    "seat": "S-259",
    "email": "naveen.yadav@gfs.com",
    "phone": "+91-9825904837",
    "teamsId": "naveen.yadav@gfs.onmicrosoft.com",
    "laptop": "LPT-5266",
    "desktop": "DSK-6913",
    "vpn": "VPN-448",
    "activeDirectory": "AD\\naveen.yadav",
    "entraId": "usr_96189",
    "photo": "https://ui-avatars.com/api/?name=naveen+yadav&background=random",
    "joinedDate": "2022-09-07",
    "yearsOfExperience": 9,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "general",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Wireshark",
      "Splunk",
      "Bash",
      "AWS"
    ],
    "certifications": [
      "GCIH",
      "CISM"
    ],
    "projects": [
      "PRJ-332"
    ],
    "currentWorkload": 56,
    "currentCases": [
      "CASE-7010"
    ],
    "currentIncidents": [],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-912"
    ],
    "assignedAssets": [
      "AST-5704"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "in-meeting",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": true,
    "securityClearance": "standard",
    "level": 2,
    "salaryBand": "Band H",
    "bio": "Experienced Tier 1 SOC Analyst specialized in Cyber Defense.",
    "performance": "Exceeds Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 96,
    "promotionReadiness": "Ready now",
    "aiReadiness": "Medium",
    "knowledgeContributions": 16,
    "documents": [],
    "reports": [],
    "leaveBalance": 22,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-024",
    "employeeId": "GFS-0024",
    "name": "Prakash Jha",
    "designation": "Tier 1 SOC Analyst",
    "department": "Cyber Defense",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-008",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 10",
    "seat": "S-537",
    "email": "prakash.jha@gfs.com",
    "phone": "+91-9856429328",
    "teamsId": "prakash.jha@gfs.onmicrosoft.com",
    "laptop": "LPT-8342",
    "desktop": "DSK-5762",
    "vpn": "VPN-162",
    "activeDirectory": "AD\\prakash.jha",
    "entraId": "usr_63489",
    "photo": "https://ui-avatars.com/api/?name=prakash+jha&background=random",
    "joinedDate": "2016-07-25",
    "yearsOfExperience": 7,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "morning",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Splunk",
      "KQL",
      "Python",
      "Bash"
    ],
    "certifications": [
      "CEH",
      "AWS Security"
    ],
    "projects": [
      "PRJ-548"
    ],
    "currentWorkload": 55,
    "currentCases": [
      "CASE-4711"
    ],
    "currentIncidents": [],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-954"
    ],
    "assignedAssets": [
      "AST-8637"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "offline",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "standard",
    "level": 2,
    "salaryBand": "Band H",
    "bio": "Experienced Tier 1 SOC Analyst specialized in Cyber Defense.",
    "performance": "Meets Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 12,
    "promotionReadiness": "2-3 years",
    "aiReadiness": "Low",
    "knowledgeContributions": 5,
    "documents": [],
    "reports": [],
    "leaveBalance": 19,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-025",
    "employeeId": "GFS-0025",
    "name": "Jyoti Sharma",
    "designation": "Tier 1 SOC Analyst",
    "department": "Cyber Defense",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-008",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 6",
    "seat": "S-497",
    "email": "jyoti.sharma@gfs.com",
    "phone": "+91-9886179809",
    "teamsId": "jyoti.sharma@gfs.onmicrosoft.com",
    "laptop": "LPT-7666",
    "desktop": null,
    "vpn": "VPN-188",
    "activeDirectory": "AD\\jyoti.sharma",
    "entraId": "usr_48521",
    "photo": "https://ui-avatars.com/api/?name=jyoti+sharma&background=random",
    "joinedDate": "2019-11-15",
    "yearsOfExperience": 14,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "night",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "CrowdStrike",
      "Splunk",
      "BurpSuite",
      "GCP"
    ],
    "certifications": [
      "CISM",
      "GCIH"
    ],
    "projects": [
      "PRJ-922"
    ],
    "currentWorkload": 75,
    "currentCases": [
      "CASE-7181"
    ],
    "currentIncidents": [],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-935"
    ],
    "assignedAssets": [
      "AST-2885"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "offline",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "standard",
    "level": 2,
    "salaryBand": "Band H",
    "bio": "Experienced Tier 1 SOC Analyst specialized in Cyber Defense.",
    "performance": "Meets Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 86,
    "promotionReadiness": "Ready now",
    "aiReadiness": "High",
    "knowledgeContributions": 15,
    "documents": [],
    "reports": [],
    "leaveBalance": 9,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-026",
    "employeeId": "GFS-0026",
    "name": "Shilpa Kulkarni",
    "designation": "Tier 1 SOC Analyst",
    "department": "Cyber Defense",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-008",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 6",
    "seat": "S-142",
    "email": "shilpa.kulkarni@gfs.com",
    "phone": "+91-9835368913",
    "teamsId": "shilpa.kulkarni@gfs.onmicrosoft.com",
    "laptop": "LPT-4461",
    "desktop": "DSK-9606",
    "vpn": "VPN-110",
    "activeDirectory": "AD\\shilpa.kulkarni",
    "entraId": "usr_48399",
    "photo": "https://ui-avatars.com/api/?name=shilpa+kulkarni&background=random",
    "joinedDate": "2024-01-29",
    "yearsOfExperience": 12,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "evening",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Azure Sentinel",
      "Python",
      "Wireshark",
      "AWS"
    ],
    "certifications": [
      "GCIH",
      "CISSP"
    ],
    "projects": [
      "PRJ-508"
    ],
    "currentWorkload": 55,
    "currentCases": [],
    "currentIncidents": [],
    "currentInvestigations": [
      "INV-5422"
    ],
    "currentDevices": [
      "DEV-804"
    ],
    "assignedAssets": [
      "AST-6274"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "active",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": true,
    "securityClearance": "standard",
    "level": 2,
    "salaryBand": "Band H",
    "bio": "Experienced Tier 1 SOC Analyst specialized in Cyber Defense.",
    "performance": "Meets Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 97,
    "promotionReadiness": "1-2 years",
    "aiReadiness": "High",
    "knowledgeContributions": 29,
    "documents": [],
    "reports": [],
    "leaveBalance": 22,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-027",
    "employeeId": "GFS-0027",
    "name": "Rohan Deshmukh",
    "designation": "Incident Response Manager",
    "department": "Incident Response",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-005",
    "directReports": [
      "emp-029",
      "emp-030",
      "emp-032"
    ],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 4",
    "seat": "S-226",
    "email": "rohan.deshmukh@gfs.com",
    "phone": "+91-9881484454",
    "teamsId": "rohan.deshmukh@gfs.onmicrosoft.com",
    "laptop": "LPT-1549",
    "desktop": "DSK-9458",
    "vpn": "VPN-207",
    "activeDirectory": "AD\\rohan.deshmukh",
    "entraId": "usr_20570",
    "photo": "https://ui-avatars.com/api/?name=rohan+deshmukh&background=random",
    "joinedDate": "2025-05-07",
    "yearsOfExperience": 7,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "general",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "AWS",
      "Wireshark",
      "Azure Sentinel",
      "KQL"
    ],
    "certifications": [
      "GCIH",
      "CISM"
    ],
    "projects": [
      "PRJ-376"
    ],
    "currentWorkload": 74,
    "currentCases": [],
    "currentIncidents": [],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-550"
    ],
    "assignedAssets": [
      "AST-6351"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "away",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "elevated",
    "level": 5,
    "salaryBand": "Band E",
    "bio": "Experienced Incident Response Manager specialized in Cyber Defense.",
    "performance": "Meets Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 68,
    "promotionReadiness": "Ready now",
    "aiReadiness": "Medium",
    "knowledgeContributions": 37,
    "documents": [],
    "reports": [],
    "leaveBalance": 26,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-028",
    "employeeId": "GFS-0028",
    "name": "Sunita Williams",
    "designation": "Incident Response Manager",
    "department": "Incident Response",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-005",
    "directReports": [
      "emp-031",
      "emp-033"
    ],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 6",
    "seat": "S-773",
    "email": "sunita.williams@gfs.com",
    "phone": "+91-9839770073",
    "teamsId": "sunita.williams@gfs.onmicrosoft.com",
    "laptop": "LPT-7841",
    "desktop": null,
    "vpn": "VPN-378",
    "activeDirectory": "AD\\sunita.williams",
    "entraId": "usr_75500",
    "photo": "https://ui-avatars.com/api/?name=sunita+williams&background=random",
    "joinedDate": "2024-08-29",
    "yearsOfExperience": 14,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "night",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Splunk",
      "AWS",
      "GCP",
      "BurpSuite"
    ],
    "certifications": [
      "CISM",
      "OSCP"
    ],
    "projects": [
      "PRJ-785"
    ],
    "currentWorkload": 56,
    "currentCases": [
      "CASE-5649"
    ],
    "currentIncidents": [],
    "currentInvestigations": [
      "INV-2493"
    ],
    "currentDevices": [
      "DEV-843"
    ],
    "assignedAssets": [
      "AST-6850"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "offline",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": true,
    "securityClearance": "elevated",
    "level": 5,
    "salaryBand": "Band E",
    "bio": "Experienced Incident Response Manager specialized in Cyber Defense.",
    "performance": "Meets Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 81,
    "promotionReadiness": "2-3 years",
    "aiReadiness": "High",
    "knowledgeContributions": 30,
    "documents": [],
    "reports": [],
    "leaveBalance": 18,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-029",
    "employeeId": "GFS-0029",
    "name": "Nisha Das",
    "designation": "Incident Responder",
    "department": "Incident Response",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-027",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 1",
    "seat": "S-772",
    "email": "nisha.das@gfs.com",
    "phone": "+91-9810385598",
    "teamsId": "nisha.das@gfs.onmicrosoft.com",
    "laptop": "LPT-3102",
    "desktop": null,
    "vpn": "VPN-413",
    "activeDirectory": "AD\\nisha.das",
    "entraId": "usr_19821",
    "photo": "https://ui-avatars.com/api/?name=nisha+das&background=random",
    "joinedDate": "2016-05-23",
    "yearsOfExperience": 3,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "general",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Splunk",
      "Azure Sentinel",
      "CrowdStrike",
      "BurpSuite"
    ],
    "certifications": [
      "CEH",
      "AWS Security"
    ],
    "projects": [
      "PRJ-952"
    ],
    "currentWorkload": 37,
    "currentCases": [
      "CASE-5140"
    ],
    "currentIncidents": [],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-671"
    ],
    "assignedAssets": [
      "AST-2652"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "in-meeting",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": true,
    "securityClearance": "elevated",
    "level": 4,
    "salaryBand": "Band F",
    "bio": "Experienced Incident Responder specialized in Cyber Defense.",
    "performance": "Exceptional",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 34,
    "promotionReadiness": "1-2 years",
    "aiReadiness": "High",
    "knowledgeContributions": 43,
    "documents": [],
    "reports": [],
    "leaveBalance": 14,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-030",
    "employeeId": "GFS-0030",
    "name": "Arjun Sharma",
    "designation": "Incident Responder",
    "department": "Incident Response",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-027",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 3",
    "seat": "S-188",
    "email": "arjun.sharma@gfs.com",
    "phone": "+91-9852555628",
    "teamsId": "arjun.sharma@gfs.onmicrosoft.com",
    "laptop": "LPT-3768",
    "desktop": "DSK-8152",
    "vpn": "VPN-916",
    "activeDirectory": "AD\\arjun.sharma",
    "entraId": "usr_48289",
    "photo": "https://ui-avatars.com/api/?name=arjun+sharma&background=random",
    "joinedDate": "2018-02-13",
    "yearsOfExperience": 7,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "evening",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "BurpSuite",
      "Python",
      "Azure Sentinel",
      "Wireshark"
    ],
    "certifications": [
      "Azure SC-200",
      "GCFA"
    ],
    "projects": [
      "PRJ-120"
    ],
    "currentWorkload": 75,
    "currentCases": [
      "CASE-4698"
    ],
    "currentIncidents": [
      "INC-2393"
    ],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-141"
    ],
    "assignedAssets": [
      "AST-4452"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "away",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "elevated",
    "level": 4,
    "salaryBand": "Band F",
    "bio": "Experienced Incident Responder specialized in Cyber Defense.",
    "performance": "Exceeds Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 85,
    "promotionReadiness": "Ready now",
    "aiReadiness": "High",
    "knowledgeContributions": 2,
    "documents": [],
    "reports": [],
    "leaveBalance": 21,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-031",
    "employeeId": "GFS-0031",
    "name": "Ganesh Acharya",
    "designation": "Incident Responder",
    "department": "Incident Response",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-028",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 7",
    "seat": "S-381",
    "email": "ganesh.acharya@gfs.com",
    "phone": "+91-9862565635",
    "teamsId": "ganesh.acharya@gfs.onmicrosoft.com",
    "laptop": "LPT-6863",
    "desktop": "DSK-6990",
    "vpn": "VPN-934",
    "activeDirectory": "AD\\ganesh.acharya",
    "entraId": "usr_47180",
    "photo": "https://ui-avatars.com/api/?name=ganesh+acharya&background=random",
    "joinedDate": "2018-06-02",
    "yearsOfExperience": 9,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "evening",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Python",
      "Powershell",
      "Wireshark",
      "Bash"
    ],
    "certifications": [
      "OSCP",
      "CISSP"
    ],
    "projects": [
      "PRJ-131"
    ],
    "currentWorkload": 49,
    "currentCases": [
      "CASE-3143"
    ],
    "currentIncidents": [],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-288"
    ],
    "assignedAssets": [
      "AST-3044"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "away",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": true,
    "securityClearance": "elevated",
    "level": 4,
    "salaryBand": "Band F",
    "bio": "Experienced Incident Responder specialized in Cyber Defense.",
    "performance": "Meets Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 29,
    "promotionReadiness": "2-3 years",
    "aiReadiness": "Low",
    "knowledgeContributions": 6,
    "documents": [],
    "reports": [],
    "leaveBalance": 12,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-032",
    "employeeId": "GFS-0032",
    "name": "Meera Joshi",
    "designation": "DFIR Specialist",
    "department": "Incident Response",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-027",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 3",
    "seat": "S-742",
    "email": "meera.joshi@gfs.com",
    "phone": "+91-9898368301",
    "teamsId": "meera.joshi@gfs.onmicrosoft.com",
    "laptop": "LPT-8768",
    "desktop": null,
    "vpn": "VPN-780",
    "activeDirectory": "AD\\meera.joshi",
    "entraId": "usr_11968",
    "photo": "https://ui-avatars.com/api/?name=meera+joshi&background=random",
    "joinedDate": "2022-04-15",
    "yearsOfExperience": 6,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "general",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "CrowdStrike",
      "Python",
      "GCP",
      "AWS"
    ],
    "certifications": [
      "CISSP",
      "CISM"
    ],
    "projects": [
      "PRJ-867"
    ],
    "currentWorkload": 67,
    "currentCases": [
      "CASE-6727"
    ],
    "currentIncidents": [
      "INC-8001"
    ],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-698"
    ],
    "assignedAssets": [
      "AST-7641"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "away",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": true,
    "securityClearance": "elevated",
    "level": 4,
    "salaryBand": "Band F",
    "bio": "Experienced DFIR Specialist specialized in Cyber Defense.",
    "performance": "Exceeds Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 80,
    "promotionReadiness": "2-3 years",
    "aiReadiness": "High",
    "knowledgeContributions": 9,
    "documents": [],
    "reports": [],
    "leaveBalance": 23,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-033",
    "employeeId": "GFS-0033",
    "name": "Siddharth Banerjee",
    "designation": "DFIR Specialist",
    "department": "Incident Response",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-028",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 10",
    "seat": "S-397",
    "email": "siddharth.banerjee@gfs.com",
    "phone": "+91-9875169878",
    "teamsId": "siddharth.banerjee@gfs.onmicrosoft.com",
    "laptop": "LPT-8529",
    "desktop": "DSK-4074",
    "vpn": "VPN-759",
    "activeDirectory": "AD\\siddharth.banerjee",
    "entraId": "usr_10176",
    "photo": "https://ui-avatars.com/api/?name=siddharth+banerjee&background=random",
    "joinedDate": "2023-02-13",
    "yearsOfExperience": 10,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "evening",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Powershell",
      "Python",
      "Bash",
      "AWS"
    ],
    "certifications": [
      "OSCP",
      "CEH"
    ],
    "projects": [
      "PRJ-889"
    ],
    "currentWorkload": 78,
    "currentCases": [],
    "currentIncidents": [],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-331"
    ],
    "assignedAssets": [
      "AST-5090"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "active",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "elevated",
    "level": 4,
    "salaryBand": "Band F",
    "bio": "Experienced DFIR Specialist specialized in Cyber Defense.",
    "performance": "Meets Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 92,
    "promotionReadiness": "1-2 years",
    "aiReadiness": "Medium",
    "knowledgeContributions": 8,
    "documents": [],
    "reports": [],
    "leaveBalance": 7,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-034",
    "employeeId": "GFS-0034",
    "name": "Abhishek Sen",
    "designation": "Threat Intelligence Lead",
    "department": "Threat Intelligence",
    "division": "Strategy",
    "businessUnit": "Corporate",
    "manager": "emp-005",
    "directReports": [
      "emp-036",
      "emp-037",
      "emp-045"
    ],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 3",
    "seat": "S-559",
    "email": "abhishek.sen@gfs.com",
    "phone": "+91-9853455972",
    "teamsId": "abhishek.sen@gfs.onmicrosoft.com",
    "laptop": "LPT-1887",
    "desktop": "DSK-1673",
    "vpn": "VPN-567",
    "activeDirectory": "AD\\abhishek.sen",
    "entraId": "usr_38020",
    "photo": "https://ui-avatars.com/api/?name=abhishek+sen&background=random",
    "joinedDate": "2016-03-14",
    "yearsOfExperience": 10,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "night",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "CrowdStrike",
      "GCP",
      "Powershell",
      "Wireshark"
    ],
    "certifications": [
      "GCIH",
      "CEH"
    ],
    "projects": [
      "PRJ-521"
    ],
    "currentWorkload": 94,
    "currentCases": [
      "CASE-1190"
    ],
    "currentIncidents": [],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-600"
    ],
    "assignedAssets": [
      "AST-4671"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "active",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "elevated",
    "level": 5,
    "salaryBand": "Band E",
    "bio": "Experienced Threat Intelligence Lead specialized in Cyber Defense.",
    "performance": "Meets Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 20,
    "promotionReadiness": "1-2 years",
    "aiReadiness": "Low",
    "knowledgeContributions": 47,
    "documents": [],
    "reports": [],
    "leaveBalance": 21,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-035",
    "employeeId": "GFS-0035",
    "name": "Sai Krishna",
    "designation": "Threat Intelligence Lead",
    "department": "Threat Intelligence",
    "division": "Strategy",
    "businessUnit": "Corporate",
    "manager": "emp-005",
    "directReports": [
      "emp-038",
      "emp-039",
      "emp-046"
    ],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 2",
    "seat": "S-606",
    "email": "sai.krishna@gfs.com",
    "phone": "+91-9866416900",
    "teamsId": "sai.krishna@gfs.onmicrosoft.com",
    "laptop": "LPT-5623",
    "desktop": "DSK-8840",
    "vpn": "VPN-778",
    "activeDirectory": "AD\\sai.krishna",
    "entraId": "usr_72887",
    "photo": "https://ui-avatars.com/api/?name=sai+krishna&background=random",
    "joinedDate": "2024-01-01",
    "yearsOfExperience": 8,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "morning",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Splunk",
      "Python",
      "Wireshark",
      "AWS"
    ],
    "certifications": [
      "GCIH",
      "GCFA"
    ],
    "projects": [
      "PRJ-661"
    ],
    "currentWorkload": 38,
    "currentCases": [
      "CASE-4479"
    ],
    "currentIncidents": [],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-368"
    ],
    "assignedAssets": [
      "AST-7955"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "active",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "elevated",
    "level": 5,
    "salaryBand": "Band E",
    "bio": "Experienced Threat Intelligence Lead specialized in Cyber Defense.",
    "performance": "Exceptional",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 55,
    "promotionReadiness": "2-3 years",
    "aiReadiness": "Medium",
    "knowledgeContributions": 33,
    "documents": [],
    "reports": [],
    "leaveBalance": 22,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-036",
    "employeeId": "GFS-0036",
    "name": "Rakesh Sharma",
    "designation": "Threat Hunter",
    "department": "Threat Intelligence",
    "division": "Strategy",
    "businessUnit": "Corporate",
    "manager": "emp-034",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 4",
    "seat": "S-323",
    "email": "rakesh.sharma@gfs.com",
    "phone": "+91-9881057444",
    "teamsId": "rakesh.sharma@gfs.onmicrosoft.com",
    "laptop": "LPT-2955",
    "desktop": "DSK-2582",
    "vpn": "VPN-431",
    "activeDirectory": "AD\\rakesh.sharma",
    "entraId": "usr_92214",
    "photo": "https://ui-avatars.com/api/?name=rakesh+sharma&background=random",
    "joinedDate": "2016-03-27",
    "yearsOfExperience": 7,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "evening",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Wireshark",
      "Powershell",
      "Splunk",
      "Azure Sentinel"
    ],
    "certifications": [
      "AWS Security",
      "CISSP"
    ],
    "projects": [
      "PRJ-571"
    ],
    "currentWorkload": 92,
    "currentCases": [
      "CASE-4989"
    ],
    "currentIncidents": [
      "INC-5179"
    ],
    "currentInvestigations": [
      "INV-9744"
    ],
    "currentDevices": [
      "DEV-338"
    ],
    "assignedAssets": [
      "AST-3232"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "active",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": true,
    "securityClearance": "elevated",
    "level": 4,
    "salaryBand": "Band F",
    "bio": "Experienced Threat Hunter specialized in Cyber Defense.",
    "performance": "Exceptional",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 31,
    "promotionReadiness": "2-3 years",
    "aiReadiness": "Low",
    "knowledgeContributions": 8,
    "documents": [],
    "reports": [],
    "leaveBalance": 24,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-037",
    "employeeId": "GFS-0037",
    "name": "Ravi Shankar",
    "designation": "Threat Hunter",
    "department": "Threat Intelligence",
    "division": "Strategy",
    "businessUnit": "Corporate",
    "manager": "emp-034",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 1",
    "seat": "S-816",
    "email": "ravi.shankar@gfs.com",
    "phone": "+91-9841547136",
    "teamsId": "ravi.shankar@gfs.onmicrosoft.com",
    "laptop": "LPT-1125",
    "desktop": "DSK-8283",
    "vpn": "VPN-998",
    "activeDirectory": "AD\\ravi.shankar",
    "entraId": "usr_47673",
    "photo": "https://ui-avatars.com/api/?name=ravi+shankar&background=random",
    "joinedDate": "2022-07-22",
    "yearsOfExperience": 12,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "morning",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "CrowdStrike",
      "Splunk",
      "Wireshark",
      "AWS"
    ],
    "certifications": [
      "CISM",
      "CEH"
    ],
    "projects": [
      "PRJ-381"
    ],
    "currentWorkload": 90,
    "currentCases": [
      "CASE-3157"
    ],
    "currentIncidents": [],
    "currentInvestigations": [
      "INV-2311"
    ],
    "currentDevices": [
      "DEV-157"
    ],
    "assignedAssets": [
      "AST-8791"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "offline",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": true,
    "securityClearance": "elevated",
    "level": 4,
    "salaryBand": "Band F",
    "bio": "Experienced Threat Hunter specialized in Cyber Defense.",
    "performance": "Meets Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 97,
    "promotionReadiness": "1-2 years",
    "aiReadiness": "High",
    "knowledgeContributions": 29,
    "documents": [],
    "reports": [],
    "leaveBalance": 8,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-038",
    "employeeId": "GFS-0038",
    "name": "Maya Kapoor",
    "designation": "Threat Hunter",
    "department": "Threat Intelligence",
    "division": "Strategy",
    "businessUnit": "Corporate",
    "manager": "emp-035",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 8",
    "seat": "S-112",
    "email": "maya.kapoor@gfs.com",
    "phone": "+91-9839173678",
    "teamsId": "maya.kapoor@gfs.onmicrosoft.com",
    "laptop": "LPT-4397",
    "desktop": "DSK-4089",
    "vpn": "VPN-763",
    "activeDirectory": "AD\\maya.kapoor",
    "entraId": "usr_97646",
    "photo": "https://ui-avatars.com/api/?name=maya+kapoor&background=random",
    "joinedDate": "2024-06-10",
    "yearsOfExperience": 15,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "night",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Splunk",
      "Bash",
      "Powershell",
      "Python"
    ],
    "certifications": [
      "Azure SC-200",
      "AWS Security"
    ],
    "projects": [
      "PRJ-367"
    ],
    "currentWorkload": 64,
    "currentCases": [
      "CASE-1393"
    ],
    "currentIncidents": [],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-853"
    ],
    "assignedAssets": [
      "AST-6016"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "away",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "elevated",
    "level": 4,
    "salaryBand": "Band F",
    "bio": "Experienced Threat Hunter specialized in Cyber Defense.",
    "performance": "Exceeds Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 75,
    "promotionReadiness": "Ready now",
    "aiReadiness": "High",
    "knowledgeContributions": 20,
    "documents": [],
    "reports": [],
    "leaveBalance": 10,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-039",
    "employeeId": "GFS-0039",
    "name": "Ananya Raj",
    "designation": "Threat Hunter",
    "department": "Threat Intelligence",
    "division": "Strategy",
    "businessUnit": "Corporate",
    "manager": "emp-035",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 5",
    "seat": "S-435",
    "email": "ananya.raj@gfs.com",
    "phone": "+91-9873801314",
    "teamsId": "ananya.raj@gfs.onmicrosoft.com",
    "laptop": "LPT-3296",
    "desktop": null,
    "vpn": "VPN-672",
    "activeDirectory": "AD\\ananya.raj",
    "entraId": "usr_41234",
    "photo": "https://ui-avatars.com/api/?name=ananya+raj&background=random",
    "joinedDate": "2021-11-09",
    "yearsOfExperience": 9,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "night",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Powershell",
      "CrowdStrike",
      "Azure Sentinel",
      "GCP"
    ],
    "certifications": [
      "Azure SC-200",
      "CISSP"
    ],
    "projects": [
      "PRJ-944"
    ],
    "currentWorkload": 74,
    "currentCases": [
      "CASE-5386"
    ],
    "currentIncidents": [],
    "currentInvestigations": [
      "INV-4845"
    ],
    "currentDevices": [
      "DEV-565"
    ],
    "assignedAssets": [
      "AST-4808"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "in-meeting",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "elevated",
    "level": 4,
    "salaryBand": "Band F",
    "bio": "Experienced Threat Hunter specialized in Cyber Defense.",
    "performance": "Exceeds Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 42,
    "promotionReadiness": "Ready now",
    "aiReadiness": "High",
    "knowledgeContributions": 28,
    "documents": [],
    "reports": [],
    "leaveBalance": 28,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-040",
    "employeeId": "GFS-0040",
    "name": "Rahul Bose",
    "designation": "Detection Engineering Lead",
    "department": "Detection Engineering",
    "division": "Engineering",
    "businessUnit": "Corporate",
    "manager": "emp-005",
    "directReports": [
      "emp-042",
      "emp-043"
    ],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 6",
    "seat": "S-176",
    "email": "rahul.bose@gfs.com",
    "phone": "+91-9880362557",
    "teamsId": "rahul.bose@gfs.onmicrosoft.com",
    "laptop": "LPT-5735",
    "desktop": "DSK-4527",
    "vpn": "VPN-416",
    "activeDirectory": "AD\\rahul.bose",
    "entraId": "usr_34822",
    "photo": "https://ui-avatars.com/api/?name=rahul+bose&background=random",
    "joinedDate": "2019-04-09",
    "yearsOfExperience": 9,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "general",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Splunk",
      "AWS",
      "Bash",
      "Wireshark"
    ],
    "certifications": [
      "Azure SC-200",
      "AWS Security"
    ],
    "projects": [
      "PRJ-997"
    ],
    "currentWorkload": 37,
    "currentCases": [
      "CASE-3580"
    ],
    "currentIncidents": [],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-743"
    ],
    "assignedAssets": [
      "AST-6864"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "offline",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "elevated",
    "level": 5,
    "salaryBand": "Band E",
    "bio": "Experienced Detection Engineering Lead specialized in Cyber Defense.",
    "performance": "Meets Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 60,
    "promotionReadiness": "1-2 years",
    "aiReadiness": "High",
    "knowledgeContributions": 38,
    "documents": [],
    "reports": [],
    "leaveBalance": 7,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-041",
    "employeeId": "GFS-0041",
    "name": "Pooja Menon",
    "designation": "Detection Engineering Lead",
    "department": "Detection Engineering",
    "division": "Engineering",
    "businessUnit": "Corporate",
    "manager": "emp-005",
    "directReports": [
      "emp-044"
    ],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 9",
    "seat": "S-368",
    "email": "pooja.menon@gfs.com",
    "phone": "+91-9898839913",
    "teamsId": "pooja.menon@gfs.onmicrosoft.com",
    "laptop": "LPT-7543",
    "desktop": "DSK-1400",
    "vpn": "VPN-435",
    "activeDirectory": "AD\\pooja.menon",
    "entraId": "usr_96351",
    "photo": "https://ui-avatars.com/api/?name=pooja+menon&background=random",
    "joinedDate": "2016-11-16",
    "yearsOfExperience": 2,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "evening",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "GCP",
      "Bash",
      "Powershell",
      "BurpSuite"
    ],
    "certifications": [
      "GCFA",
      "CISM"
    ],
    "projects": [
      "PRJ-699"
    ],
    "currentWorkload": 86,
    "currentCases": [
      "CASE-5249"
    ],
    "currentIncidents": [
      "INC-5221"
    ],
    "currentInvestigations": [
      "INV-6848"
    ],
    "currentDevices": [
      "DEV-553"
    ],
    "assignedAssets": [
      "AST-7405"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "away",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": true,
    "securityClearance": "elevated",
    "level": 5,
    "salaryBand": "Band E",
    "bio": "Experienced Detection Engineering Lead specialized in Cyber Defense.",
    "performance": "Meets Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 89,
    "promotionReadiness": "1-2 years",
    "aiReadiness": "Medium",
    "knowledgeContributions": 13,
    "documents": [],
    "reports": [],
    "leaveBalance": 7,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-042",
    "employeeId": "GFS-0042",
    "name": "Preeti Agarwal",
    "designation": "Detection Engineer",
    "department": "Detection Engineering",
    "division": "Engineering",
    "businessUnit": "Corporate",
    "manager": "emp-040",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 4",
    "seat": "S-226",
    "email": "preeti.agarwal@gfs.com",
    "phone": "+91-9836080864",
    "teamsId": "preeti.agarwal@gfs.onmicrosoft.com",
    "laptop": "LPT-9051",
    "desktop": "DSK-2054",
    "vpn": "VPN-146",
    "activeDirectory": "AD\\preeti.agarwal",
    "entraId": "usr_70711",
    "photo": "https://ui-avatars.com/api/?name=preeti+agarwal&background=random",
    "joinedDate": "2021-11-25",
    "yearsOfExperience": 7,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "night",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "AWS",
      "Azure Sentinel",
      "Wireshark",
      "KQL"
    ],
    "certifications": [
      "CISM",
      "GCIH"
    ],
    "projects": [
      "PRJ-853"
    ],
    "currentWorkload": 81,
    "currentCases": [
      "CASE-4907"
    ],
    "currentIncidents": [],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-780"
    ],
    "assignedAssets": [
      "AST-3921"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "active",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": true,
    "securityClearance": "elevated",
    "level": 4,
    "salaryBand": "Band F",
    "bio": "Experienced Detection Engineer specialized in Cyber Defense.",
    "performance": "Exceptional",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 88,
    "promotionReadiness": "Ready now",
    "aiReadiness": "Low",
    "knowledgeContributions": 11,
    "documents": [],
    "reports": [],
    "leaveBalance": 13,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-043",
    "employeeId": "GFS-0043",
    "name": "Anand Gokhale",
    "designation": "Detection Engineer",
    "department": "Detection Engineering",
    "division": "Engineering",
    "businessUnit": "Corporate",
    "manager": "emp-040",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 9",
    "seat": "S-930",
    "email": "anand.gokhale@gfs.com",
    "phone": "+91-9872398946",
    "teamsId": "anand.gokhale@gfs.onmicrosoft.com",
    "laptop": "LPT-5061",
    "desktop": "DSK-4870",
    "vpn": "VPN-515",
    "activeDirectory": "AD\\anand.gokhale",
    "entraId": "usr_22037",
    "photo": "https://ui-avatars.com/api/?name=anand+gokhale&background=random",
    "joinedDate": "2017-02-16",
    "yearsOfExperience": 11,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "evening",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Splunk",
      "CrowdStrike",
      "Azure Sentinel",
      "GCP"
    ],
    "certifications": [
      "Azure SC-200",
      "OSCP"
    ],
    "projects": [
      "PRJ-372"
    ],
    "currentWorkload": 48,
    "currentCases": [
      "CASE-2006"
    ],
    "currentIncidents": [],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-838"
    ],
    "assignedAssets": [
      "AST-2316"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "active",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": true,
    "securityClearance": "elevated",
    "level": 4,
    "salaryBand": "Band F",
    "bio": "Experienced Detection Engineer specialized in Cyber Defense.",
    "performance": "Meets Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 99,
    "promotionReadiness": "2-3 years",
    "aiReadiness": "Medium",
    "knowledgeContributions": 7,
    "documents": [],
    "reports": [],
    "leaveBalance": 18,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-044",
    "employeeId": "GFS-0044",
    "name": "Sneha Rao",
    "designation": "Detection Engineer",
    "department": "Detection Engineering",
    "division": "Engineering",
    "businessUnit": "Corporate",
    "manager": "emp-041",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 1",
    "seat": "S-551",
    "email": "sneha.rao@gfs.com",
    "phone": "+91-9822888469",
    "teamsId": "sneha.rao@gfs.onmicrosoft.com",
    "laptop": "LPT-4696",
    "desktop": "DSK-3512",
    "vpn": "VPN-489",
    "activeDirectory": "AD\\sneha.rao",
    "entraId": "usr_44594",
    "photo": "https://ui-avatars.com/api/?name=sneha+rao&background=random",
    "joinedDate": "2015-01-25",
    "yearsOfExperience": 15,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "general",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Powershell",
      "CrowdStrike",
      "Wireshark",
      "Bash"
    ],
    "certifications": [
      "CISSP",
      "CISM"
    ],
    "projects": [
      "PRJ-632"
    ],
    "currentWorkload": 84,
    "currentCases": [
      "CASE-5605"
    ],
    "currentIncidents": [],
    "currentInvestigations": [
      "INV-1874"
    ],
    "currentDevices": [
      "DEV-849"
    ],
    "assignedAssets": [
      "AST-3106"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "offline",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "elevated",
    "level": 4,
    "salaryBand": "Band F",
    "bio": "Experienced Detection Engineer specialized in Cyber Defense.",
    "performance": "Meets Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 87,
    "promotionReadiness": "2-3 years",
    "aiReadiness": "Medium",
    "knowledgeContributions": 40,
    "documents": [],
    "reports": [],
    "leaveBalance": 16,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-045",
    "employeeId": "GFS-0045",
    "name": "Neha Gupta",
    "designation": "Malware Analyst",
    "department": "Threat Intelligence",
    "division": "Strategy",
    "businessUnit": "Corporate",
    "manager": "emp-034",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 5",
    "seat": "S-152",
    "email": "neha.gupta@gfs.com",
    "phone": "+91-9868688171",
    "teamsId": "neha.gupta@gfs.onmicrosoft.com",
    "laptop": "LPT-5937",
    "desktop": "DSK-4906",
    "vpn": "VPN-665",
    "activeDirectory": "AD\\neha.gupta",
    "entraId": "usr_99041",
    "photo": "https://ui-avatars.com/api/?name=neha+gupta&background=random",
    "joinedDate": "2016-05-04",
    "yearsOfExperience": 9,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "night",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Bash",
      "Azure Sentinel",
      "KQL",
      "Powershell"
    ],
    "certifications": [
      "CEH",
      "GCFA"
    ],
    "projects": [
      "PRJ-662"
    ],
    "currentWorkload": 95,
    "currentCases": [
      "CASE-3596"
    ],
    "currentIncidents": [],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-798"
    ],
    "assignedAssets": [
      "AST-4098"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "in-meeting",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": true,
    "securityClearance": "elevated",
    "level": 4,
    "salaryBand": "Band F",
    "bio": "Experienced Malware Analyst specialized in Cyber Defense.",
    "performance": "Exceptional",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 13,
    "promotionReadiness": "2-3 years",
    "aiReadiness": "Low",
    "knowledgeContributions": 33,
    "documents": [],
    "reports": [],
    "leaveBalance": 22,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-046",
    "employeeId": "GFS-0046",
    "name": "Anjali Desai",
    "designation": "Malware Analyst",
    "department": "Threat Intelligence",
    "division": "Strategy",
    "businessUnit": "Corporate",
    "manager": "emp-035",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 2",
    "seat": "S-758",
    "email": "anjali.desai@gfs.com",
    "phone": "+91-9845685643",
    "teamsId": "anjali.desai@gfs.onmicrosoft.com",
    "laptop": "LPT-1854",
    "desktop": null,
    "vpn": "VPN-675",
    "activeDirectory": "AD\\anjali.desai",
    "entraId": "usr_44935",
    "photo": "https://ui-avatars.com/api/?name=anjali+desai&background=random",
    "joinedDate": "2016-12-25",
    "yearsOfExperience": 5,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "morning",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "CrowdStrike",
      "GCP",
      "KQL",
      "Wireshark"
    ],
    "certifications": [
      "Azure SC-200",
      "GCFA"
    ],
    "projects": [
      "PRJ-745"
    ],
    "currentWorkload": 91,
    "currentCases": [],
    "currentIncidents": [],
    "currentInvestigations": [
      "INV-6568"
    ],
    "currentDevices": [
      "DEV-606"
    ],
    "assignedAssets": [
      "AST-4060"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "in-meeting",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": true,
    "securityClearance": "elevated",
    "level": 4,
    "salaryBand": "Band F",
    "bio": "Experienced Malware Analyst specialized in Cyber Defense.",
    "performance": "Exceeds Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 11,
    "promotionReadiness": "1-2 years",
    "aiReadiness": "Low",
    "knowledgeContributions": 19,
    "documents": [],
    "reports": [],
    "leaveBalance": 7,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-047",
    "employeeId": "GFS-0047",
    "name": "Sanjay Verma",
    "designation": "Security Architecture Lead",
    "department": "Architecture",
    "division": "Engineering",
    "businessUnit": "Corporate",
    "manager": "emp-005",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 4",
    "seat": "S-203",
    "email": "sanjay.verma@gfs.com",
    "phone": "+91-9810383304",
    "teamsId": "sanjay.verma@gfs.onmicrosoft.com",
    "laptop": "LPT-7911",
    "desktop": null,
    "vpn": "VPN-435",
    "activeDirectory": "AD\\sanjay.verma",
    "entraId": "usr_39030",
    "photo": "https://ui-avatars.com/api/?name=sanjay+verma&background=random",
    "joinedDate": "2023-02-16",
    "yearsOfExperience": 11,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "general",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Azure Sentinel",
      "Powershell",
      "Splunk",
      "CrowdStrike"
    ],
    "certifications": [
      "OSCP",
      "GCIH"
    ],
    "projects": [
      "PRJ-349"
    ],
    "currentWorkload": 89,
    "currentCases": [
      "CASE-7482"
    ],
    "currentIncidents": [],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-762"
    ],
    "assignedAssets": [
      "AST-3684"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "active",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "elevated",
    "level": 5,
    "salaryBand": "Band E",
    "bio": "Experienced Security Architecture Lead specialized in Cyber Defense.",
    "performance": "Exceeds Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 43,
    "promotionReadiness": "2-3 years",
    "aiReadiness": "High",
    "knowledgeContributions": 23,
    "documents": [],
    "reports": [],
    "leaveBalance": 23,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-048",
    "employeeId": "GFS-0048",
    "name": "Vikram Singh",
    "designation": "Security Architecture Lead",
    "department": "Architecture",
    "division": "Engineering",
    "businessUnit": "Corporate",
    "manager": "emp-005",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 10",
    "seat": "S-239",
    "email": "vikram.singh@gfs.com",
    "phone": "+91-9892622225",
    "teamsId": "vikram.singh@gfs.onmicrosoft.com",
    "laptop": "LPT-6229",
    "desktop": null,
    "vpn": "VPN-219",
    "activeDirectory": "AD\\vikram.singh",
    "entraId": "usr_69303",
    "photo": "https://ui-avatars.com/api/?name=vikram+singh&background=random",
    "joinedDate": "2017-05-24",
    "yearsOfExperience": 8,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "general",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Splunk",
      "AWS",
      "Python",
      "CrowdStrike"
    ],
    "certifications": [
      "CEH",
      "CISM"
    ],
    "projects": [
      "PRJ-172"
    ],
    "currentWorkload": 87,
    "currentCases": [
      "CASE-1635"
    ],
    "currentIncidents": [
      "INC-5967"
    ],
    "currentInvestigations": [
      "INV-4729"
    ],
    "currentDevices": [
      "DEV-896"
    ],
    "assignedAssets": [
      "AST-6013"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "away",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "elevated",
    "level": 5,
    "salaryBand": "Band E",
    "bio": "Experienced Security Architecture Lead specialized in Cyber Defense.",
    "performance": "Exceeds Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 21,
    "promotionReadiness": "1-2 years",
    "aiReadiness": "Medium",
    "knowledgeContributions": 10,
    "documents": [],
    "reports": [],
    "leaveBalance": 11,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-049",
    "employeeId": "GFS-0049",
    "name": "Prateek Yadav",
    "designation": "Vulnerability Mgmt Lead",
    "department": "Vulnerability Management",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-005",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 2",
    "seat": "S-373",
    "email": "prateek.yadav@gfs.com",
    "phone": "+91-9877424970",
    "teamsId": "prateek.yadav@gfs.onmicrosoft.com",
    "laptop": "LPT-1311",
    "desktop": "DSK-2285",
    "vpn": "VPN-900",
    "activeDirectory": "AD\\prateek.yadav",
    "entraId": "usr_96390",
    "photo": "https://ui-avatars.com/api/?name=prateek+yadav&background=random",
    "joinedDate": "2019-09-21",
    "yearsOfExperience": 8,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "general",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "BurpSuite",
      "Azure Sentinel",
      "Powershell",
      "Splunk"
    ],
    "certifications": [
      "CISM",
      "Azure SC-200"
    ],
    "projects": [
      "PRJ-919"
    ],
    "currentWorkload": 70,
    "currentCases": [
      "CASE-7750"
    ],
    "currentIncidents": [],
    "currentInvestigations": [
      "INV-2713"
    ],
    "currentDevices": [
      "DEV-719"
    ],
    "assignedAssets": [
      "AST-3687"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "offline",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": true,
    "securityClearance": "elevated",
    "level": 5,
    "salaryBand": "Band E",
    "bio": "Experienced Vulnerability Mgmt Lead specialized in Cyber Defense.",
    "performance": "Exceeds Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 83,
    "promotionReadiness": "Ready now",
    "aiReadiness": "Medium",
    "knowledgeContributions": 31,
    "documents": [],
    "reports": [],
    "leaveBalance": 27,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-050",
    "employeeId": "GFS-0050",
    "name": "Sonia Nair",
    "designation": "Vulnerability Mgmt Lead",
    "department": "Vulnerability Management",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-005",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 7",
    "seat": "S-243",
    "email": "sonia.nair@gfs.com",
    "phone": "+91-9899064594",
    "teamsId": "sonia.nair@gfs.onmicrosoft.com",
    "laptop": "LPT-2371",
    "desktop": null,
    "vpn": "VPN-823",
    "activeDirectory": "AD\\sonia.nair",
    "entraId": "usr_67061",
    "photo": "https://ui-avatars.com/api/?name=sonia+nair&background=random",
    "joinedDate": "2019-09-29",
    "yearsOfExperience": 4,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "evening",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "GCP",
      "Azure Sentinel",
      "BurpSuite",
      "AWS"
    ],
    "certifications": [
      "CISSP",
      "CEH"
    ],
    "projects": [
      "PRJ-256"
    ],
    "currentWorkload": 92,
    "currentCases": [
      "CASE-8194"
    ],
    "currentIncidents": [
      "INC-1023"
    ],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-512"
    ],
    "assignedAssets": [
      "AST-5921"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "active",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": true,
    "securityClearance": "elevated",
    "level": 5,
    "salaryBand": "Band E",
    "bio": "Experienced Vulnerability Mgmt Lead specialized in Cyber Defense.",
    "performance": "Exceptional",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 28,
    "promotionReadiness": "Ready now",
    "aiReadiness": "Medium",
    "knowledgeContributions": 32,
    "documents": [],
    "reports": [],
    "leaveBalance": 27,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-051",
    "employeeId": "GFS-0051",
    "name": "Vivek Menon",
    "designation": "Purple Team Lead",
    "department": "Offensive Security",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-005",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 10",
    "seat": "S-996",
    "email": "vivek.menon@gfs.com",
    "phone": "+91-9832765175",
    "teamsId": "vivek.menon@gfs.onmicrosoft.com",
    "laptop": "LPT-7099",
    "desktop": null,
    "vpn": "VPN-132",
    "activeDirectory": "AD\\vivek.menon",
    "entraId": "usr_50408",
    "photo": "https://ui-avatars.com/api/?name=vivek+menon&background=random",
    "joinedDate": "2017-10-21",
    "yearsOfExperience": 15,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "morning",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Python",
      "GCP",
      "Bash",
      "CrowdStrike"
    ],
    "certifications": [
      "GCIH",
      "CISSP"
    ],
    "projects": [
      "PRJ-673"
    ],
    "currentWorkload": 43,
    "currentCases": [],
    "currentIncidents": [
      "INC-3525"
    ],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-448"
    ],
    "assignedAssets": [
      "AST-7858"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "away",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": true,
    "securityClearance": "elevated",
    "level": 5,
    "salaryBand": "Band E",
    "bio": "Experienced Purple Team Lead specialized in Cyber Defense.",
    "performance": "Exceptional",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 14,
    "promotionReadiness": "Ready now",
    "aiReadiness": "Low",
    "knowledgeContributions": 15,
    "documents": [],
    "reports": [],
    "leaveBalance": 27,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-052",
    "employeeId": "GFS-0052",
    "name": "Swati Mahajan",
    "designation": "Purple Team Lead",
    "department": "Offensive Security",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-005",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 6",
    "seat": "S-388",
    "email": "swati.mahajan@gfs.com",
    "phone": "+91-9844354773",
    "teamsId": "swati.mahajan@gfs.onmicrosoft.com",
    "laptop": "LPT-3175",
    "desktop": "DSK-7193",
    "vpn": "VPN-533",
    "activeDirectory": "AD\\swati.mahajan",
    "entraId": "usr_96997",
    "photo": "https://ui-avatars.com/api/?name=swati+mahajan&background=random",
    "joinedDate": "2025-12-15",
    "yearsOfExperience": 10,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "morning",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Azure Sentinel",
      "AWS",
      "Python",
      "Splunk"
    ],
    "certifications": [
      "GCIH",
      "OSCP"
    ],
    "projects": [
      "PRJ-541"
    ],
    "currentWorkload": 49,
    "currentCases": [
      "CASE-8953"
    ],
    "currentIncidents": [
      "INC-5850"
    ],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-401"
    ],
    "assignedAssets": [
      "AST-3948"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "offline",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": true,
    "securityClearance": "elevated",
    "level": 5,
    "salaryBand": "Band E",
    "bio": "Experienced Purple Team Lead specialized in Cyber Defense.",
    "performance": "Meets Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 17,
    "promotionReadiness": "Ready now",
    "aiReadiness": "High",
    "knowledgeContributions": 1,
    "documents": [],
    "reports": [],
    "leaveBalance": 19,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-053",
    "employeeId": "GFS-0053",
    "name": "Divya Prakash",
    "designation": "Red Team Lead",
    "department": "Offensive Security",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-005",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 6",
    "seat": "S-275",
    "email": "divya.prakash@gfs.com",
    "phone": "+91-9865247156",
    "teamsId": "divya.prakash@gfs.onmicrosoft.com",
    "laptop": "LPT-8572",
    "desktop": "DSK-2099",
    "vpn": "VPN-416",
    "activeDirectory": "AD\\divya.prakash",
    "entraId": "usr_99814",
    "photo": "https://ui-avatars.com/api/?name=divya+prakash&background=random",
    "joinedDate": "2017-07-08",
    "yearsOfExperience": 4,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "evening",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Wireshark",
      "Bash",
      "CrowdStrike",
      "KQL"
    ],
    "certifications": [
      "GCFA",
      "CISSP"
    ],
    "projects": [
      "PRJ-958"
    ],
    "currentWorkload": 73,
    "currentCases": [],
    "currentIncidents": [
      "INC-2150"
    ],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-457"
    ],
    "assignedAssets": [
      "AST-9388"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "active",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "elevated",
    "level": 5,
    "salaryBand": "Band E",
    "bio": "Experienced Red Team Lead specialized in Cyber Defense.",
    "performance": "Exceeds Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 84,
    "promotionReadiness": "1-2 years",
    "aiReadiness": "Medium",
    "knowledgeContributions": 39,
    "documents": [],
    "reports": [],
    "leaveBalance": 26,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-054",
    "employeeId": "GFS-0054",
    "name": "Varun Malhotra",
    "designation": "Red Team Lead",
    "department": "Offensive Security",
    "division": "Operations",
    "businessUnit": "Corporate",
    "manager": "emp-005",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 5",
    "seat": "S-548",
    "email": "varun.malhotra@gfs.com",
    "phone": "+91-9843771238",
    "teamsId": "varun.malhotra@gfs.onmicrosoft.com",
    "laptop": "LPT-1444",
    "desktop": null,
    "vpn": "VPN-912",
    "activeDirectory": "AD\\varun.malhotra",
    "entraId": "usr_21922",
    "photo": "https://ui-avatars.com/api/?name=varun+malhotra&background=random",
    "joinedDate": "2021-09-28",
    "yearsOfExperience": 15,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "evening",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Powershell",
      "GCP",
      "BurpSuite",
      "CrowdStrike"
    ],
    "certifications": [
      "Azure SC-200",
      "AWS Security"
    ],
    "projects": [
      "PRJ-141"
    ],
    "currentWorkload": 38,
    "currentCases": [
      "CASE-3090"
    ],
    "currentIncidents": [],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-643"
    ],
    "assignedAssets": [
      "AST-6127"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "active",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "elevated",
    "level": 5,
    "salaryBand": "Band E",
    "bio": "Experienced Red Team Lead specialized in Cyber Defense.",
    "performance": "Meets Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 24,
    "promotionReadiness": "Ready now",
    "aiReadiness": "Low",
    "knowledgeContributions": 27,
    "documents": [],
    "reports": [],
    "leaveBalance": 29,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-055",
    "employeeId": "GFS-0055",
    "name": "Simran Kaur",
    "designation": "GRC Manager",
    "department": "Risk & Compliance",
    "division": "Strategy",
    "businessUnit": "Corporate",
    "manager": "emp-005",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 10",
    "seat": "S-155",
    "email": "simran.kaur@gfs.com",
    "phone": "+91-9842136962",
    "teamsId": "simran.kaur@gfs.onmicrosoft.com",
    "laptop": "LPT-1150",
    "desktop": "DSK-7780",
    "vpn": "VPN-932",
    "activeDirectory": "AD\\simran.kaur",
    "entraId": "usr_69333",
    "photo": "https://ui-avatars.com/api/?name=simran+kaur&background=random",
    "joinedDate": "2021-06-14",
    "yearsOfExperience": 12,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "evening",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Splunk",
      "Bash",
      "Azure Sentinel",
      "CrowdStrike"
    ],
    "certifications": [
      "GCFA",
      "CEH"
    ],
    "projects": [
      "PRJ-339"
    ],
    "currentWorkload": 66,
    "currentCases": [
      "CASE-1111"
    ],
    "currentIncidents": [],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-768"
    ],
    "assignedAssets": [
      "AST-5236"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "in-meeting",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": false,
    "securityClearance": "elevated",
    "level": 5,
    "salaryBand": "Band E",
    "bio": "Experienced GRC Manager specialized in Cyber Defense.",
    "performance": "Exceeds Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 53,
    "promotionReadiness": "2-3 years",
    "aiReadiness": "Low",
    "knowledgeContributions": 14,
    "documents": [],
    "reports": [],
    "leaveBalance": 14,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  },
  {
    "id": "emp-056",
    "employeeId": "GFS-0056",
    "name": "Amit Patel",
    "designation": "GRC Manager",
    "department": "Risk & Compliance",
    "division": "Strategy",
    "businessUnit": "Corporate",
    "manager": "emp-005",
    "directReports": [],
    "location": "Bengaluru, IND",
    "office": "GFS Cyber Hub",
    "floor": "Floor 4",
    "seat": "S-996",
    "email": "amit.patel@gfs.com",
    "phone": "+91-9849614257",
    "teamsId": "amit.patel@gfs.onmicrosoft.com",
    "laptop": "LPT-4047",
    "desktop": null,
    "vpn": "VPN-893",
    "activeDirectory": "AD\\amit.patel",
    "entraId": "usr_41157",
    "photo": "https://ui-avatars.com/api/?name=amit+patel&background=random",
    "joinedDate": "2024-10-23",
    "yearsOfExperience": 14,
    "employmentType": "Full-Time",
    "employmentStatus": "Active",
    "shift": "general",
    "workingHours": "09:00 - 18:00",
    "skills": [
      "Python",
      "CrowdStrike",
      "Powershell",
      "BurpSuite"
    ],
    "certifications": [
      "CEH",
      "OSCP"
    ],
    "projects": [
      "PRJ-493"
    ],
    "currentWorkload": 62,
    "currentCases": [],
    "currentIncidents": [
      "INC-1124"
    ],
    "currentInvestigations": [],
    "currentDevices": [
      "DEV-516"
    ],
    "assignedAssets": [
      "AST-4201"
    ],
    "currentApplications": [
      "Splunk",
      "Jira",
      "ServiceNow"
    ],
    "status": "active",
    "lastLogin": "2026-08-01T10:40:54Z",
    "vpnSession": true,
    "securityClearance": "elevated",
    "level": 5,
    "salaryBand": "Band E",
    "bio": "Experienced GRC Manager specialized in Cyber Defense.",
    "performance": "Exceeds Expectations",
    "careerPath": "Technical Expert Track",
    "trainingProgress": 22,
    "promotionReadiness": "1-2 years",
    "aiReadiness": "Low",
    "knowledgeContributions": 12,
    "documents": [],
    "reports": [],
    "leaveBalance": 8,
    "performanceHistory": [
      {
        "year": "2025",
        "rating": "Exceeds Expectations",
        "notes": "Great work"
      }
    ]
  }
];
