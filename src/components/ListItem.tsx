import React from 'react';
import {ListItemButton, ListItemText, Typography} from "@mui/material";

type TPropsListItem = {
	title: string
	text?: string
	color?: string
	done?: boolean
	children: string | JSX.Element | JSX.Element[]
	onPress?: () => unknown
}

const ListElem = ({title, text, color, children, onPress, done }: TPropsListItem): JSX.Element => {
	const textConvert = text && text.split(' ').length > 4 && text.split(' ').slice(0, 4).join(' ') + '...';
	return (
		<ListItemButton sx={{
			ml: 4,
			'&::before': {
				content: '""',
				width: '5px',
				height: '40px',
				position: 'absolute',
				background: color || '#fff',
				borderRadius: '3px',
				left: 0
			}
		}}
			onClick={onPress}
		>
			<ListItemText>
				<Typography
					variant="h2"
					sx={{
						textDecoration: done ? "line-through" : "none"
					}}
				>
					{title}
				</Typography>
				{text && <Typography >{textConvert}</Typography>}
			</ListItemText>
			{children}
		</ListItemButton>
	);
};

export default ListElem;
