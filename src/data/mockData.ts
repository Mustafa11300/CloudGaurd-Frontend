// Simulated cloud security data based on the Cloud Security Copilot project

export interface Finding {
  finding_id: string;
  resource_id: string;
  resource_type: string;
  rule_id: string;
  title: string;
  description: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  risk_score: number;
  remediation: string;
  business_impact: string;
  detected_at: string;
}

export interface MetricData {
  label: string;
  value: string;
  trend: string;
  status: "normal" | "warning" | "critical";
}

export interface ScanSnapshot {
  scan_id: string;
  timestamp: string;
  security_score: number;
  cost_health_score: number;
  total_findings: number;
  critical_count: number;
  high_count: number;
  monthly_waste_usd: number;
}

export interface CostWaste {
  resource_id: string;
  resource_type: string;
  instance_type: string;
  region: string;
  cpu_avg: number;
  monthly_cost: number;
  estimated_waste: number;
  running_hours: number;
}

export const findings: Finding[] = [
  {
    finding_id: "S3-001-s3-customer-data-482",
    resource_id: "s3-customer-data-482",
    resource_type: "S3",
    rule_id: "S3-001",
    title: "S3 Bucket Publicly Accessible",
    description: "Bucket contains 847,231 objects (2,340 GB) and is accessible to the public internet.",
    severity: "CRITICAL",
    risk_score: 95,
    remediation: "IMMEDIATE: Block public access, review bucket policy and ACLs, audit data exposure.",
    business_impact: "Customer PII exposed. Average breach cost: $4.45M. GDPR/HIPAA fines possible.",
    detected_at: "2026-03-15T08:22:01Z",
  },
  {
    finding_id: "SG-001-sg-a3f8e21b",
    resource_id: "sg-a3f8e21b",
    resource_type: "SECURITY_GROUP",
    rule_id: "SG-001",
    title: "SSH Port 22 Open to Internet",
    description: "Security group allows inbound SSH (port 22) from 0.0.0.0/0. Any IP can attempt SSH login.",
    severity: "CRITICAL",
    risk_score: 90,
    remediation: "Restrict SSH to specific IP ranges. Use a bastion host or SSM Session Manager.",
    business_impact: "Direct server access risk. Brute-force attacks imminent. Potential full compromise.",
    detected_at: "2026-03-15T08:22:01Z",
  },
  {
    finding_id: "S3-001-s3-backup-logs-117",
    resource_id: "s3-backup-logs-117",
    resource_type: "S3",
    rule_id: "S3-001",
    title: "S3 Bucket Publicly Accessible",
    description: "Backup bucket with 12,450 objects (890 GB) is publicly accessible.",
    severity: "CRITICAL",
    risk_score: 95,
    remediation: "IMMEDIATE: Block public access and audit exposed backup data.",
    business_impact: "Backup data exposure could reveal infrastructure details and credentials.",
    detected_at: "2026-03-14T14:05:22Z",
  },
  {
    finding_id: "RDS-001-rds-prod-mysql-42",
    resource_id: "rds-prod-mysql-42",
    resource_type: "RDS",
    rule_id: "RDS-001",
    title: "RDS Instance Publicly Accessible",
    description: "Production MySQL database is reachable from the internet.",
    severity: "CRITICAL",
    risk_score: 92,
    remediation: "Disable public accessibility, move to private subnet, use VPN/bastion for access.",
    business_impact: "Database breach risk. Contains production data. SQL injection attacks possible.",
    detected_at: "2026-03-15T08:22:01Z",
  },
  {
    finding_id: "IAM-001-iam-jdoe-234",
    resource_id: "iam-jdoe-234",
    resource_type: "IAM_USER",
    rule_id: "IAM-001",
    title: "MFA Not Enabled for IAM User 'jdoe'",
    description: "User 'jdoe' can authenticate with password only. No second factor required.",
    severity: "HIGH",
    risk_score: 75,
    remediation: "Enable MFA: IAM Console → Users → jdoe → Security credentials → Assign MFA.",
    business_impact: "Account takeover via stolen credentials. Single point of failure for authentication.",
    detected_at: "2026-03-15T08:22:01Z",
  },
  {
    finding_id: "IAM-001-iam-admin-bot-891",
    resource_id: "iam-admin-bot-891",
    resource_type: "IAM_USER",
    rule_id: "IAM-001",
    title: "MFA Not Enabled for IAM User 'admin-bot'",
    description: "Service account 'admin-bot' has admin policy and no MFA enabled.",
    severity: "HIGH",
    risk_score: 80,
    remediation: "Enable MFA and review admin policy necessity. Consider using IAM roles instead.",
    business_impact: "Admin-level account without MFA. Full AWS account compromise risk.",
    detected_at: "2026-03-14T20:11:33Z",
  },
  {
    finding_id: "S3-002-s3-analytics-778",
    resource_id: "s3-analytics-778",
    resource_type: "S3",
    rule_id: "S3-002",
    title: "S3 Bucket Encryption Disabled",
    description: "Bucket (1,200 GB) stores data unencrypted. Plain text at rest.",
    severity: "HIGH",
    risk_score: 70,
    remediation: "Enable default SSE-S3 or SSE-KMS encryption. Re-encrypt existing objects.",
    business_impact: "PCI-DSS, HIPAA, SOC2 compliance failure. Data readable if storage compromised.",
    detected_at: "2026-03-15T08:22:01Z",
  },
  {
    finding_id: "SG-002-sg-db-open-3306",
    resource_id: "sg-db-open-3306",
    resource_type: "SECURITY_GROUP",
    rule_id: "SG-002",
    title: "MySQL Port 3306 Open to Internet",
    description: "Security group exposes MySQL port to 0.0.0.0/0.",
    severity: "HIGH",
    risk_score: 85,
    remediation: "Restrict to application security groups only. No direct internet access.",
    business_impact: "Database directly attackable from internet. Data exfiltration risk.",
    detected_at: "2026-03-13T16:45:00Z",
  },
  {
    finding_id: "RDS-002-rds-staging-pg-18",
    resource_id: "rds-staging-pg-18",
    resource_type: "RDS",
    rule_id: "RDS-002",
    title: "RDS Encryption at Rest Disabled",
    description: "Staging PostgreSQL instance stores data without encryption.",
    severity: "HIGH",
    risk_score: 65,
    remediation: "Create encrypted snapshot, restore to new encrypted instance, swap endpoints.",
    business_impact: "Compliance violation. Staging often contains production-like data.",
    detected_at: "2026-03-14T09:30:00Z",
  },
  {
    finding_id: "EC2-001-ec2-idle-server-55",
    resource_id: "ec2-idle-server-55",
    resource_type: "EC2",
    rule_id: "EC2-001",
    title: "Severely Underutilized EC2 Instance",
    description: "Instance at 2.1% CPU over 720 hours. Monthly cost: $138.24. Waste: $117.50/mo.",
    severity: "MEDIUM",
    risk_score: 45,
    remediation: "Review workload. Consider downsizing or terminating. Evaluate Auto Scaling.",
    business_impact: "Wasting $117.50/month ($1,410/year). Multiply across fleet for total impact.",
    detected_at: "2026-03-15T08:22:01Z",
  },
  {
    finding_id: "S3-003-s3-logs-disabled-201",
    resource_id: "s3-logs-disabled-201",
    resource_type: "S3",
    rule_id: "S3-003",
    title: "S3 Access Logging Disabled",
    description: "No access logs collected. Cannot audit data access or detect unauthorized activity.",
    severity: "MEDIUM",
    risk_score: 40,
    remediation: "Enable server access logging. Set target log bucket.",
    business_impact: "Breach investigation impossible. HIPAA/SOC2 audit trail requirement failure.",
    detected_at: "2026-03-15T08:22:01Z",
  },
  {
    finding_id: "EC2-002-ec2-untagged-12",
    resource_id: "ec2-untagged-12",
    resource_type: "EC2",
    rule_id: "EC2-002",
    title: "EC2 Instance Missing Purpose Tag",
    description: "Instance has no 'purpose' or 'owner' tag. Cannot determine ownership.",
    severity: "LOW",
    risk_score: 20,
    remediation: "Add tags: Purpose, Owner, Environment, CostCenter.",
    business_impact: "Cost allocation impossible. Cannot determine if safe to decommission.",
    detected_at: "2026-03-15T08:22:01Z",
  },
  {
    finding_id: "EC2-001-ec2-idle-77",
    resource_id: "ec2-idle-77",
    resource_type: "EC2",
    rule_id: "EC2-001",
    title: "Severely Underutilized EC2 Instance",
    description: "Instance at 1.3% CPU over 540 hours. Monthly cost: $276.48. Waste: $234.50/mo.",
    severity: "MEDIUM",
    risk_score: 45,
    remediation: "Downsize to t3.small or terminate. Current m5.xlarge is massively oversized.",
    business_impact: "Wasting $234.50/month ($2,814/year).",
    detected_at: "2026-03-14T12:00:00Z",
  },
  {
    finding_id: "IAM-002-iam-ghost-user-445",
    resource_id: "iam-ghost-user-445",
    resource_type: "IAM_USER",
    rule_id: "IAM-002",
    title: "Inactive IAM User (180+ Days)",
    description: "User 'legacy-deploy' has not logged in for 187 days. Access keys still active.",
    severity: "MEDIUM",
    risk_score: 50,
    remediation: "Disable access keys. If no complaints after 30 days, delete the user.",
    business_impact: "Ghost accounts are prime targets for attackers. Unused credentials are attack vectors.",
    detected_at: "2026-03-15T08:22:01Z",
  },
];

export const scanHistory: ScanSnapshot[] = [
  { scan_id: "scan-001", timestamp: "2026-03-09T08:00:00Z", security_score: 58, cost_health_score: 62, total_findings: 18, critical_count: 5, high_count: 6, monthly_waste_usd: 1842 },
  { scan_id: "scan-002", timestamp: "2026-03-10T08:00:00Z", security_score: 55, cost_health_score: 60, total_findings: 19, critical_count: 5, high_count: 7, monthly_waste_usd: 1920 },
  { scan_id: "scan-003", timestamp: "2026-03-11T08:00:00Z", security_score: 61, cost_health_score: 64, total_findings: 16, critical_count: 4, high_count: 6, monthly_waste_usd: 1780 },
  { scan_id: "scan-004", timestamp: "2026-03-12T08:00:00Z", security_score: 59, cost_health_score: 63, total_findings: 17, critical_count: 4, high_count: 6, monthly_waste_usd: 1805 },
  { scan_id: "scan-005", timestamp: "2026-03-13T08:00:00Z", security_score: 63, cost_health_score: 67, total_findings: 15, critical_count: 4, high_count: 5, monthly_waste_usd: 1650 },
  { scan_id: "scan-006", timestamp: "2026-03-14T08:00:00Z", security_score: 67, cost_health_score: 70, total_findings: 14, critical_count: 3, high_count: 5, monthly_waste_usd: 1520 },
  { scan_id: "scan-007", timestamp: "2026-03-15T08:00:00Z", security_score: 64, cost_health_score: 68, total_findings: 14, critical_count: 4, high_count: 5, monthly_waste_usd: 1580 },
];

export const costWaste: CostWaste[] = [
  { resource_id: "ec2-idle-77", resource_type: "EC2", instance_type: "m5.xlarge", region: "us-east-1", cpu_avg: 1.3, monthly_cost: 276.48, estimated_waste: 234.50, running_hours: 540 },
  { resource_id: "ec2-idle-server-55", resource_type: "EC2", instance_type: "m5.large", region: "us-west-2", cpu_avg: 2.1, monthly_cost: 138.24, estimated_waste: 117.50, running_hours: 720 },
  { resource_id: "ec2-dev-test-90", resource_type: "EC2", instance_type: "c5.xlarge", region: "eu-west-1", cpu_avg: 3.8, monthly_cost: 122.40, estimated_waste: 104.04, running_hours: 680 },
  { resource_id: "ec2-staging-api-33", resource_type: "EC2", instance_type: "t3.large", region: "us-east-1", cpu_avg: 4.2, monthly_cost: 59.90, estimated_waste: 50.92, running_hours: 460 },
  { resource_id: "ec2-legacy-worker-14", resource_type: "EC2", instance_type: "r5.large", region: "us-west-2", cpu_avg: 0.8, monthly_cost: 90.72, estimated_waste: 77.11, running_hours: 720 },
  { resource_id: "rds-staging-unused-8", resource_type: "RDS", instance_type: "db.r5.large", region: "eu-west-1", cpu_avg: 1.1, monthly_cost: 172.80, estimated_waste: 146.88, running_hours: 720 },
];

export const metrics: MetricData[] = [
  { label: "Security Score", value: "64/100", trend: "+6pts", status: "warning" },
  { label: "Critical Findings", value: "4", trend: "-1", status: "critical" },
  { label: "Monthly Waste", value: "$1,580", trend: "-$262", status: "normal" },
  { label: "Resources Scanned", value: "290", trend: "+0", status: "normal" },
];

export const severityCounts = {
  critical: findings.filter(f => f.severity === "CRITICAL").length,
  high: findings.filter(f => f.severity === "HIGH").length,
  medium: findings.filter(f => f.severity === "MEDIUM").length,
  low: findings.filter(f => f.severity === "LOW").length,
};
