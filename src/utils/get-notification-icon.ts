import { NotificationType } from '@/graphql/generated/output';
import { Bell, CheckIcon, Fingerprint, Medal, Radio, User } from 'lucide-react';

export function getNotificationIcon(type: NotificationType) {
	switch (type) {
		case NotificationType.StreamStarted:
			return Radio;
		case NotificationType.NewFollower:
			return User;
		case NotificationType.NewSponsorship:
			return Medal;
		case NotificationType.EnableTwoFactor:
			return Fingerprint;
		case NotificationType.ChannelVerified:
			return CheckIcon;
		default:
			return Bell;
	}
}
