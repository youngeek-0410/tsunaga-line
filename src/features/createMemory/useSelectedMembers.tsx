import type { ProfileRead } from '@/api/@types';
import { useState } from 'react';

export const useSelectedMembers = () => {
  const [selectedMembers, setSelectedMembers] = useState<ProfileRead[]>([]);

  const updateSelectedMember = ({
    checked,
    profile,
  }: {
    checked: boolean | 'indeterminate';
    profile: ProfileRead;
  }) => {
    if (checked === 'indeterminate') {
      return;
    }
    if (checked) {
      setSelectedMembers([...selectedMembers, profile]);
    } else {
      setSelectedMembers(selectedMembers.filter(({ uuid }) => uuid !== profile.uuid));
    }
  };

  const removeSelectedMember = (id: string) => {
    setSelectedMembers(selectedMembers.filter(({ uuid }) => uuid !== id));
  };

  return { selectedMembers, updateSelectedMember, removeSelectedMember };
};
