import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { State } from '../interfaces';

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setstate] = useState<State>();
  const { issuesQuery } = useIssues({ state: state, labels: selectedLabels });

  const onLabelChanged = (labelName: string): void => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            issues={issuesQuery.data?.pages.flat() || []}
            state={state}
            onStateChanged={(newState) => setstate(newState)}
          />
        )}

        <button
          className="btn btn-outline-primary mt-2"
          onClick={() => issuesQuery.fetchNextPage()}
          disabled={!issuesQuery.hasNextPage || issuesQuery.isFetchingNextPage}
        >
          Load More
        </button>
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabel={selectedLabels}
          onChange={(labelName) => onLabelChanged(labelName)}
        />
      </div>
    </div>
  );
};
