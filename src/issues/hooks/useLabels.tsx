import { useQuery } from '@tanstack/react-query';
import { gitHubApi } from '../../api/githubApi';
import { Label } from '../interfaces';
import { sleep } from '../../helpers/sleep';

const getLabels = async (): Promise<Label[]> => {
  await sleep(2);
  const { data } = await gitHubApi.get<Label[]>('/labels');
  return data;
};

export const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ['labels'],
    queryFn: getLabels,
    // staleTime: 1000 * 60 * 60,
    // initialData: [],
    placeholderData: [
      {
        id: 717031390,
        node_id: 'MDU6TGFiZWw3MTcwMzEzOTA=',
        url: 'https://api.github.com/repos/facebook/react/labels/good%20first%20issue',
        name: 'good first issue',
        color: '6ce26a',
        default: true,
        description: null,
      },
    ],
  });

  return labelsQuery;
};
