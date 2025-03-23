'use client';

import {
	useFindSocialLinksQuery,
	useReorderSocialLinksMutation,
} from '@/graphql/generated/output';
import { useTranslations } from 'next-intl';
import React from 'react';
import {
	DragDropContext,
	Draggable,
	Droppable,
	type DropResult,
} from '@hello-pangea/dnd';
import { Separator } from '@/components/ui/common';
import { SocialLinkItem } from './SocialLinkItem';
import { toast } from 'sonner';

export function SocialLinksList() {
	const t = useTranslations('dashboard.settings.profile.socialLinks');

	const { data, refetch } = useFindSocialLinksQuery();
	const items = data?.findSocialLinks || [];

	const [socialLinks, setSocialLinks] = React.useState(items);

	React.useEffect(() => {
		setSocialLinks(items);
	}, [items]);

	const [reoder, { loading: isReorderLoading }] = useReorderSocialLinksMutation({
		onCompleted() {
			refetch();
		},
		onError({ graphQLErrors: [{ message }] }) {
			toast.error(message ?? t('errorReorderMessage'));
		},
	});

	function onDragEnd(res: DropResult) {
		if (!res.destination) return;

		const items = Array.from(socialLinks);
		const [reorederItem] = items.splice(res.source.index, 1);

		items.splice(res.destination.index, 0, reorederItem);

		const bulkUpdateData = items.map((socialLinks, i) => ({
			id: socialLinks.id,
			position: i,
		}));
		setSocialLinks(items);

		reoder({ variables: { list: bulkUpdateData } });
	}

	return socialLinks.length ? (
		<>
			<Separator />
			<div className='px-5 mt-5'>
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId='socialLinks'>
						{(provided) => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}>
								{socialLinks.map((socialLink, i) => (
									<Draggable
										key={i}
										draggableId={socialLink.id}
										index={i}
										isDragDisabled={isReorderLoading}>
										{(provided) => (
											<SocialLinkItem
												key={i}
												socialLink={socialLink}
												provided={provided}
											/>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</div>
		</>
	) : null;
}
