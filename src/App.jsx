import { useState } from "react";
import { Search, Plus, Mail, Trash2, Edit2, Save, X } from "lucide-react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../src/components/ui/Card";
import { Alert, AlertDescription } from "../src/components/ui/Alert";

const CRM = () => {
	// Initial state
	const [customers, setCustomers] = useState([
		{
			id: 1,
			name: "John Doe",
			email: "john@example.com",
			phone: "1234",
			notes: "VIP customer",
			interactions: [
				{
					date: "2024-11-01",
					type: "call",
					content: "Called for product inquiry",
				},
				{ date: "2024-11-02", type: "purchase", content: "Purchased item" },
			],
		},
		{
			id: 2,
			name: "Jane Smith",
			email: "jane@example.com",
			phone: "210",
			notes: "Interested in new arrivals",
			interactions: [
				{ date: "2024-10-15", type: "visit", content: "Visited store" },
				{
					date: "2024-10-20",
					type: "newsletter",
					content: "Signed up for newsletter",
				},
			],
		},
		{
			id: 3,
			name: "Alice Johnson",
			email: "alice@example.com",
			phone: "347",
			notes: "Requested refund policy details",
			interactions: [
				{ date: "2024-11-03", type: "email", content: "Emailed support" },
				{
					date: "2024-11-05",
					type: "call",
					content: "Called customer service",
				},
			],
		},
		{
			id: 4,
			name: "Bob Brown",
			email: "bob@example.com",
			phone: "43",
			notes: "Frequent buyer",
			interactions: [
				{
					date: "2024-10-01",
					type: "purchase",
					content: "Purchased multiple items",
				},
				{
					date: "2024-10-15",
					type: "review",
					content: "Reviewed products positively",
				},
			],
		},
	]);

	const [searchQuery, setSearchQuery] = useState("");
	const [editingId, setEditingId] = useState(null);
	const [showContactForm, setShowContactForm] = useState(false);
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [newMessage, setNewMessage] = useState("");
	const [isAddingNew, setIsAddingNew] = useState(false);

	const getNewCustomerTemplate = () => ({
		id: Date.now(),
		name: "",
		email: "",
		phone: "",
		notes: "",
		interactions: [],
	});

	const [editingCustomer, setEditingCustomer] = useState(
		getNewCustomerTemplate()
	);

	// Filtering customers
	const filteredCustomers = customers.filter(
		(customer) =>
			customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			customer.notes.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Add customer
	const addCustomer = () => {
		setIsAddingNew(true);
		setEditingId(null);
		setSelectedCustomer(null);
		setEditingCustomer(getNewCustomerTemplate());
	};

	// Save customer
	const saveCustomer = () => {
		if (!editingCustomer.name.trim()) {
			alert("Please enter a customer name");
			return;
		}

		if (isAddingNew) {
			const newCustomer = { ...editingCustomer, id: Date.now() };
			setCustomers((prev) => [...prev, newCustomer]);
			setIsAddingNew(false);
			setSelectedCustomer(newCustomer);
		} else {
			setCustomers((prev) =>
				prev.map((c) => (c.id === editingCustomer.id ? editingCustomer : c))
			);
			setSelectedCustomer(editingCustomer);
		}
		setEditingId(null);
		setEditingCustomer(getNewCustomerTemplate());
	};

	// Delete customer - Completely rewritten
	const deleteCustomer = (customerId) => {
		// Confirm deletion
		if (!window.confirm("Are you sure you want to delete this customer?")) {
			return;
		}

		// Update customers list
		setCustomers((prevCustomers) => {
			const newCustomers = prevCustomers.filter((c) => c.id !== customerId);

			// Reset all related states
			setSelectedCustomer(null);
			setEditingId(null);
			setIsAddingNew(false);
			setShowContactForm(false);
			setEditingCustomer(getNewCustomerTemplate());

			// If there are remaining customers, select the first one
			if (newCustomers.length > 0) {
				setSelectedCustomer(newCustomers[0]);
			}

			return newCustomers;
		});
	};

	// Send message
	const sendMessage = () => {
		if (!selectedCustomer || !newMessage.trim()) return;

		const newInteraction = {
			date: new Date().toISOString().split("T")[0],
			type: "email",
			content: newMessage,
		};

		setCustomers((prev) =>
			prev.map((c) => {
				if (c.id === selectedCustomer.id) {
					return {
						...c,
						interactions: [...c.interactions, newInteraction],
					};
				}
				return c;
			})
		);

		// Update selected customer with new interaction
		setSelectedCustomer((prev) => ({
			...prev,
			interactions: [...prev.interactions, newInteraction],
		}));

		setNewMessage("");
		setShowContactForm(false);
	};

	return (
		<div className="min-h-screen bg-gray-50 p-4">
			{/* Rest of the JSX remains the same until the delete button */}
			<div className="max-w-6xl mx-auto">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold">Customer Relationship Manager</h1>
					<button
						onClick={addCustomer}
						className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
					>
						<Plus size={20} /> Add Customer
					</button>
				</div>

				<div className="relative mb-6">
					<Search className="absolute left-3 top-3 text-gray-400" size={20} />
					<input
						type="text"
						placeholder="Search customers..."
						className="w-full pl-10 pr-4 py-2 border rounded-lg"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="md:col-span-1">
						<Card>
							<CardHeader>
								<CardTitle>Customers ({customers.length})</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									{filteredCustomers.map((customer) => (
										<div
											key={customer.id}
											className={`p-3 rounded-lg cursor-pointer ${
												selectedCustomer?.id === customer.id
													? "bg-blue-50"
													: "hover:bg-gray-50"
											}`}
											onClick={() => {
												setSelectedCustomer(customer);
												setShowContactForm(false);
												setIsAddingNew(false);
												setEditingId(null);
											}}
										>
											<div className="font-medium">{customer.name}</div>
											<div className="text-sm text-gray-500">
												{customer.email}
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="md:col-span-2">
						{isAddingNew || editingId ? (
							<Card>
								<CardHeader>
									<CardTitle>
										{isAddingNew ? "New Customer" : "Edit Customer"}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<input
											type="text"
											placeholder="Name"
											className="w-full p-2 border rounded"
											value={editingCustomer.name}
											onChange={(e) =>
												setEditingCustomer({
													...editingCustomer,
													name: e.target.value,
												})
											}
										/>
										<input
											type="email"
											placeholder="Email"
											className="w-full p-2 border rounded"
											value={editingCustomer.email}
											onChange={(e) =>
												setEditingCustomer({
													...editingCustomer,
													email: e.target.value,
												})
											}
										/>
										<input
											type="tel"
											placeholder="Phone"
											className="w-full p-2 border rounded"
											value={editingCustomer.phone}
											onChange={(e) =>
												setEditingCustomer({
													...editingCustomer,
													phone: e.target.value,
												})
											}
										/>
										<textarea
											placeholder="Notes"
											className="w-full p-2 border rounded"
											value={editingCustomer.notes}
											onChange={(e) =>
												setEditingCustomer({
													...editingCustomer,
													notes: e.target.value,
												})
											}
											rows={4}
										/>
										<div className="flex gap-2">
											<button
												onClick={saveCustomer}
												className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
											>
												<Save size={20} /> Save
											</button>
											<button
												onClick={() => {
													setEditingId(null);
													setIsAddingNew(false);
													setEditingCustomer(getNewCustomerTemplate());
												}}
												className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
											>
												<X size={20} /> Cancel
											</button>
										</div>
									</div>
								</CardContent>
							</Card>
						) : selectedCustomer ? (
							<Card>
								<CardHeader>
									<CardTitle className="flex justify-between items-center">
										<span>{selectedCustomer.name}</span>
										<div className="flex gap-2">
											<button
												onClick={() => {
													setEditingId(selectedCustomer.id);
													setEditingCustomer({ ...selectedCustomer });
												}}
												className="p-2 text-gray-600 hover:text-blue-600"
											>
												<Edit2 size={20} />
											</button>
											{/* Modified delete button */}
											<button
												onClick={(e) => {
													e.preventDefault();
													e.stopPropagation();
													deleteCustomer(selectedCustomer.id);
												}}
												className="p-2 text-gray-600 hover:text-red-600"
											>
												<Trash2 size={20} />
											</button>
											<button
												onClick={() => setShowContactForm(true)}
												className="p-2 text-gray-600 hover:text-green-600"
											>
												<Mail size={20} />
											</button>
										</div>
									</CardTitle>
								</CardHeader>
								<CardContent>
									{/* Rest of the content remains the same */}
									{showContactForm ? (
										<div className="space-y-4">
											<textarea
												placeholder="Type your message..."
												className="w-full p-2 border rounded"
												value={newMessage}
												onChange={(e) => setNewMessage(e.target.value)}
												rows={4}
											/>
											<div className="flex gap-2">
												<button
													onClick={sendMessage}
													className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
												>
													Send Message
												</button>
												<button
													onClick={() => {
														setShowContactForm(false);
														setNewMessage("");
													}}
													className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
												>
													Cancel
												</button>
											</div>
										</div>
									) : (
										<div className="space-y-4">
											<div>
												<div className="text-sm text-gray-500">Email</div>
												<div>{selectedCustomer.email}</div>
											</div>
											<div>
												<div className="text-sm text-gray-500">Phone</div>
												<div>{selectedCustomer.phone}</div>
											</div>
											<div>
												<div className="text-sm text-gray-500">Notes</div>
												<div>{selectedCustomer.notes}</div>
											</div>
											<div>
												<div className="text-sm text-gray-500 mb-2">
													Interaction History
												</div>
												{selectedCustomer.interactions.length > 0 ? (
													<div className="space-y-2">
														{selectedCustomer.interactions.map(
															(interaction, index) => (
																<Alert
																	key={index}
																	className="bg-blue-50 border-blue-200"
																>
																	<AlertDescription>
																		<div className="flex justify-between">
																			<span>{interaction.content}</span>
																			<span className="text-sm text-gray-500">
																				{interaction.date}
																			</span>
																		</div>
																	</AlertDescription>
																</Alert>
															)
														)}
													</div>
												) : (
													<div className="text-gray-500">
														No previous interactions
													</div>
												)}
											</div>
										</div>
									)}
								</CardContent>
							</Card>
						) : (
							<Card>
								<CardContent className="p-8 text-center text-gray-500">
									Select a customer or create a new one to view details
								</CardContent>
							</Card>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CRM;
