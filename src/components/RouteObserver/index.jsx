import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useGlobalContext } from '../../providers/globalContext';

export default function RouteObserver() {

    const { redirect, queryParams } = useGlobalContext()

    const location = useLocation();
    const { query, page } = queryParams();
    useEffect(() => {
        const isOnExpensesOrIncomes = page === 'expenses' || page === 'incomes';
        const isSettings = page === 'settings';

        if (!isOnExpensesOrIncomes && !isSettings) {
            const mes = query.get('mes');
            const ano = query.get('ano');

            const newParams = new URLSearchParams();
            if (mes) newParams.set('mes', mes);
            if (ano) newParams.set('ano', ano);

            redirect(`${page}/?${newParams.toString()}`, { replace: true });
        } else if (isSettings) {
            const tag = query.get('tag');

            const newParams = new URLSearchParams();
            if (tag) newParams.set('tag', tag);

            redirect(`${page}/?${newParams.toString()}`, { replace: true });
        }
    }, [location.pathname]);

    return null;
};

