import {Collapse, List, Box, FormControlLabel, Checkbox, Typography} from '@mui/material';
import React from 'react';
import { ExpandCircleDown } from "@mui/icons-material";
import ListElem from "./ListItem";
import IOSSwitch from "./Swith";

export type Task = {
	id: string,
	title: string,
	text: string,
	done: boolean,
	date: Date,
	color: string
}

export type TDayProps = {
	date: string,
	tasks: Task[]
	toggleTodo: (date: string, id: string) => void
}

const Day = ({date, tasks, toggleTodo}: TDayProps) => {

	const dateConvert = (date: string) => {
		const padTo2Digits = (num: number) => num.toString().padStart(2, '0')
		const formatDate = (date: Date) => ([
			padTo2Digits(date.getDate()),
			padTo2Digits(date.getMonth() + 1),
		].join('/'))

		const parseDate = new Date(+date).setHours(0, 0, 0, 0)
		const today = new Date().setHours(0, 0, 0, 0)
		const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0, 0, 0, 0)

		if (parseDate === today) {
			return 'Today'
		} else if (tomorrow === parseDate) {
			return 'Tomorrow'
		} else {
			return formatDate(new Date(+date))
		}
	}

	const dateFormat = dateConvert(date)

	const [open, setOpen] = React.useState(dateFormat === 'Today')
	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<Box sx={{
			mb: '32px'
		}}>
			{open &&
				<FormControlLabel control={
					<Checkbox
						defaultChecked
						onChange={handleClick}
						color="secondary"
					/>
				} label={<Typography variant="h2">{dateFormat} Tasks:</Typography>}
					sx={{
						ml: 3
					}}
				/>
			}
			<List
				component="div"
				sx={{
					boxShadow: '16px 16px 20px rgba(0, 0, 0, 0.15), -8px -8px 20px rgba(255, 255, 255, 0.05)',
					borderRadius: open ? '40px' : '25px'
				}}
			>
				{!open &&
					<ListElem title={`${dateFormat} Tasks`} onPress={handleClick}>
							<ExpandCircleDown />
					</ListElem>
				}
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{tasks?.length ? tasks.map(task => (
							<ListElem
								key={task.title}
								{...task}
							>
								<IOSSwitch
									sx={{ m: 1 }}
									checked={task.done}
									onChange={() => toggleTodo(date, task.id)}
								/>
							</ListElem>
						)) : <Typography sx={{ml: 4}} variant="h5">Nothing found! 🥺</Typography>}
					</List>
				</Collapse>
			</List>
		</Box>
	)
}

export default Day;
