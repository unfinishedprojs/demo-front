import { createSignal, onMount } from 'solid-js';
import { useParams } from '@solidjs/router';
import api from '../lib/api';

const VotePage = () => {
  const params = useParams<{ id: string }>();
  const [poll, setPoll] = createSignal<any>(null);

  onMount(async () => {
    try {
      const response = await api.getInviteEvent(localStorage.getItem('token'), params.id);
      if ('error' in response) {
        alert(`Failed to fetch poll: ${response.error}`);
      } else {
        setPoll(response);
      }
    } catch (error) {
      alert('Failed to fetch poll!');
    }
  });

  const vote = async (option: 'yes' | 'no') => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
      
      const response = option === 'yes' ? await api.votePositive(token, params.id) : await api.voteNegative(token, params.id);

      if ('error' in response) {
        alert(`Failed to submit vote: ${response.error}`);
      } else {
        alert('Vote submitted!');
      }
    } catch (error) {
      alert('Failed to submit vote!');
    }
  };

  return (
    <div class="p-4">
      {poll() ? (
        <>
          <h1 class="text-2xl">{poll().question}</h1>
          <div class="flex gap-4 mt-4">
            <button
              class="bg-green-500 text-white p-2"
              onClick={() => vote('yes')}
            >
              Yes
            </button>
            <button
              class="bg-red-500 text-white p-2"
              onClick={() => vote('no')}
            >
              No
            </button>
          </div>
        </>
      ) : (
        <p>Loading poll...</p>
      )}
    </div>
  );
};

export default VotePage;
