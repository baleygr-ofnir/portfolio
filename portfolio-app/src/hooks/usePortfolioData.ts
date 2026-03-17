import { useQuery } from '@tanstack/react-query';
import { portfolioService } from '@/services/api';

export function usePortfolio() {
    return useQuery({
        queryKey: ['portfolioProfile'],
        queryFn: portfolioService.getProfile,
        staleTime: 1000 * 60 * 5, // Keep cache fresh for 5 mins
    });
}