import * as React from 'react';

import { Icon } from '../tableIcon';

export function getDirectionPic(
	name: string,
	sortField: string | undefined = undefined,
	sortDirection: string
) {
	if (sortField === name && sortDirection === 'asc') {
		return <Icon type="arrow_up" fill="#ffffff" />;
	}

	if (sortField === name && sortDirection === 'desc') {
		return <Icon type="arrow_down" fill="#ffffff" />;
	}

	return <Icon type="unfold_more" fill="#8d9aa7" />;
}
