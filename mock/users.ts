import faker from "faker";
import { Response, Request } from "express";
import { IUserData } from "../src/api/types";

const userList: IUserData[] = [
	{
		id: 0,
		username: "admin",
		password: "any",
		name: "Super Admin",
		avatar: "https://via.placeholder.com/100x90.png",
		introduction: "I am a super administrator",
		email: "admin@test.com",
		phone: "1234567890",
		roles: ["admin"],
		language: "en",
		permissions: [
			{
				Module: "DashBoard",
				CanRead: true,
				CanDelete: true,
				CanUpdate: true,
				CanExport: true,
				CanCreate: true
			},
			{
				Module: "Article",
				CanRead: true,
				CanDelete: true,
				CanUpdate: true,
				CanExport: true,
				CanCreate: true
			}
		]
	},
	{
		id: 1,
		username: "editor",
		password: "any",
		name: "Normal Editor",
		avatar: "https://via.placeholder.com/100x90.png",
		introduction: "I am an editor",
		email: "editor@test.com",
		phone: "1234567890",
		roles: ["editor"],
		language: "en",
		permissions: [
			{
				Module: "DashBoard",
				CanRead: true,
				CanDelete: true,
				CanUpdate: true,
				CanExport: true,
				CanCreate: true
			},
			{
				Module: "Article",
				CanRead: true,
				CanDelete: false,
				CanUpdate: false,
				CanExport: false,
				CanCreate: false
			}
		]
	},
	{
		id: 2,
		username: "visitor",
		password: "visitor",
		name: "Normal visitor",
		avatar: "https://via.placeholder.com/100x90.png",
		introduction: "I am an editor",
		email: "editor@test.com",
		phone: "1234567890",
		roles: ["visitor"],
		language: "en",
		permissions: [
			{
				Module: "DashBoard",
				CanRead: true,
				CanDelete: true,
				CanUpdate: true,
				CanExport: true,
				CanCreate: true
			},
			{
				Module: "Article",
				CanRead: true,
				CanDelete: true,
				CanUpdate: true,
				CanExport: true,
				CanCreate: true
			}
		]
	}
];
const userCount = 100;

for (let i = 2; i < userCount; i++) {
	userList.push({
		id: i,
		username: "user_" + faker.random.alphaNumeric(9),
		password: faker.random.alphaNumeric(20),
		name: faker.name.findName(),
		avatar: faker.image.imageUrl(),
		introduction: faker.lorem.sentence(20),
		email: faker.internet.email(),
		phone: faker.phone.phoneNumber(),
		roles: ["visitor"],
		language: "en",
		permissions: [
			{
				Module: "DashBoard",
				CanRead: true,
				CanDelete: true,
				CanUpdate: true,
				CanExport: true,
				CanCreate: true
			},
			{
				Module: "Article",
				CanRead: true,
				CanDelete: true,
				CanUpdate: true,
				CanExport: true,
				CanCreate: true
			}
		]
	});
}

export const register = (req: Request, res: Response) => {
	return res.json({
		code: 20000
	});
};

export const login = (req: Request, res: Response) => {
	const { UserName } = req.body;
	for (const user of userList) {
		if (user.username === UserName) {
			return res.json({
				code: 20000,
				data: {
					accessToken: UserName + "-token",
					permissions: user.permissions,
					roles: user.roles,
					language: user.language
				}
			});
		}
	}
	return res.status(400).json({
		code: 50004,
		messaege: "Invalid User"
	});
};

export const logout = (req: Request, res: Response) => {
	return res.json({
		code: 20000
	});
};

export const getUsers = (req: Request, res: Response) => {
	const { name } = req.query;
	const users = userList.filter(user => {
		const lowerCaseName = user.name.toLowerCase();
		return !(name && lowerCaseName.indexOf(name.toLowerCase()) < 0);
	});
	return res.json({
		code: 20000,
		data: {
			items: users
		}
	});
};

export const getUserInfo = (req: Request, res: Response) => {
	// Mock data based on access token
	const accessToken = req.header("X-Access-Token");
	var userInfo;
	switch (accessToken) {
		case "admin-token":
			userInfo = userList[0];
			console.log(userList[0]);
			break;
		case "visitor-token":
			userInfo = userList[2];
			console.log(userList[2]);
			break;
		case "editor-token":
			userInfo = userList[1];
			console.log(userList[1]);
			break;
		default:
			break;
	}
	return res.json({
		code: 20000,
		data: {
			// user: req.header('X-Access-Token') == 'admin-token' ? userList[0] : userList[1]
			user: userInfo
		}
	});
};

export const getUserByName = (req: Request, res: Response) => {
	const { username } = req.params;
	for (const user of userList) {
		if (user.username === username) {
			return res.json({
				code: 20000,
				data: {
					user
				}
			});
		}
	}
	return res.status(400).json({
		code: 50004,
		messaege: "Invalid User"
	});
};

export const updateUser = (req: Request, res: Response) => {
	const { username } = req.params;
	const { user } = req.body;
	for (const v of userList) {
		if (v.username === username) {
			return res.json({
				code: 20000,
				data: {
					user
				}
			});
		}
	}
	return res.status(400).json({
		code: 50004,
		messaege: "Invalid User"
	});
};

export const deleteUser = (req: Request, res: Response) => {
	return res.json({
		code: 20000
	});
};
