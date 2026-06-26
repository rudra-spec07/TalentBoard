export const JOB_STATUS = {
  DRAFT: 'draft',
  OPEN: 'open',
  CLOSED: 'closed',
  EXPIRED: 'expired',
  DELETED: 'deleted',
  ARCHIVED: 'archived'
};

export const JOB_TYPE = {
  FULL_TIME: 'full_time',
  PART_TIME: 'part_time',
  CONTRACT: 'contract',
  INTERNSHIP: 'internship',
  REMOTE: 'remote'
};

export const EXPERIENCE_LEVEL = {
  ENTRY: 'entry',
  MID: 'mid',
  SENIOR: 'senior',
  LEAD: 'lead',
  DIRECTOR: 'director'
};

export const ALLOWED_STATUS_TRANSITIONS = {
  [JOB_STATUS.DRAFT]: [JOB_STATUS.OPEN, JOB_STATUS.DELETED],
  [JOB_STATUS.OPEN]: [JOB_STATUS.CLOSED, JOB_STATUS.EXPIRED, JOB_STATUS.DELETED],
  [JOB_STATUS.CLOSED]: [JOB_STATUS.OPEN, JOB_STATUS.DELETED],
  [JOB_STATUS.EXPIRED]: [JOB_STATUS.OPEN, JOB_STATUS.DELETED],
  [JOB_STATUS.DELETED]: [],
  [JOB_STATUS.ARCHIVED]: []
};
