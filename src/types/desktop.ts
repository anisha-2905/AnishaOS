export type DesktopIconId =
  | 'about'
  | 'projects'
  | 'education'
  | 'skills'
  | 'mission';

export type DesktopIconConfig = {
  id: DesktopIconId;
  label: string;
  imageSrc: string;
  imageAlt: string;
  position: {
    x: string;
    y: string;
  };
};
