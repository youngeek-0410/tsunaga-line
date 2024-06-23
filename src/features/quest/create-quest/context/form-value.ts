import type {
  ImageMemoryRead,
  QuestAchievementMemoryRead,
  QuestRequirementRead,
} from '@/api/@types';
import { atom } from 'jotai';

export type QuestRequirementForm = {
  selected: boolean;
  value: QuestRequirementRead;
};

export const selectedMemory = atom<ImageMemoryRead | QuestAchievementMemoryRead | null>(null);
export const questRequirementsAtom = atom<QuestRequirementRead[]>([]);
export const selectedQuestRequirementsAtom = atom<Map<string, string>>(new Map());
export const questRequirementsFormAtom = atom<QuestRequirementForm[]>((get, _set) => {
  const questRequirements = get(questRequirementsAtom);
  const selectedQuestRequirements = get(selectedQuestRequirementsAtom);
  return questRequirements.map((questRequirement) =>
    selectedQuestRequirements.get(questRequirement.uuid)
      ? { selected: true, value: questRequirement }
      : { selected: false, value: questRequirement },
  );
});
export const isValidQuestRequirements = atom(async (get) => {
  const questRequirements = get(questRequirementsFormAtom);
  return questRequirements.some((qr) => qr.selected);
});
