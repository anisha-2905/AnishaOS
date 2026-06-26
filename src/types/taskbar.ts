export type TaskbarLinkId = 'github' | 'notion' | 'linkedin' | 'email';

export type TaskbarLinkConfig = {
  id: TaskbarLinkId;
  label: string;
  href: string;
  ariaLabel?: string;
};
