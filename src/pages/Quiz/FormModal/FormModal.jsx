import styles from './FormModal.module.css';
import { Button, SelectionBox } from '../../../components';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowUp,
	faArrowDown,
	faCheckCircle,
	faXmarkCircle,
	faRotateRight,
} from '@fortawesome/free-solid-svg-icons';
import { tempData } from '../constants';

export default function FormModal({ closeFunction }) {
	const [form, setForm] = useState({
		namaKuis: '',
		kelas: '',
		mataPelajaran: '',
		jurusan: '',
		linkGForm: '',
	});
	const [formValidation, setFormValidation] = useState(false);
	const [isSelectKelas, setIsSelectKelas] = useState(false);
	const [isSelectMataPelajaran, setIsSelectMataPelajaran] = useState(false);
	const [isSelectJurusan, setIsSelectJurusan] = useState(false);
	const [isCheckingGForm, setIsCheckingGForm] = useState(false);
	const [checkingGFormLoading, setCheckingGFormLoading] = useState(false);
	const [isValidGForm, setIsValidGForm] = useState(false);
	const [isSuccessCreateQuiz, setIsSuccessCreateQuiz] = useState(false);

	const kelasRef = useRef(null);
	const mataPelajaranRef = useRef(null);
	const jurusanRef = useRef(null);

	const handleClickOutside = (event) => {
		if (kelasRef.current && !kelasRef.current.contains(event.target)) {
			setIsSelectKelas(false);
		}
		if (mataPelajaranRef.current && !mataPelajaranRef.current.contains(event.target)) {
			setIsSelectMataPelajaran(false);
		}
		if (jurusanRef.current && !jurusanRef.current.contains(event.target)) {
			setIsSelectJurusan(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if (
			form.namaKuis !== '' &&
			form.kelas !== '' &&
			form.mataPelajaran !== '' &&
			form.jurusan !== '' &&
			form.linkGForm !== '' &&
			isValidGForm
		) {
			setFormValidation(true);
		} else {
			setFormValidation(false);
		}
	}, [form, isValidGForm]);

	const checkGFormExistence = (url) => {
		const regex =
			/^https?:\/\/(docs\.google\.com\/forms\/[a-zA-Z0-9_-]+|forms\.gle\/[a-zA-Z0-9_-]+)/;
		const isValidURL = regex.test(url);
		return isValidURL;
	};

	const handleClickCheckingGForm = () => {
		setCheckingGFormLoading(true);

		setTimeout(() => {
			setCheckingGFormLoading(false);
			setIsCheckingGForm(true);
			setIsValidGForm(checkGFormExistence(form.linkGForm));
		}, 1000);
	};

	return (
		<div className={styles.container}>
			{isSuccessCreateQuiz ? (
				<>
					<span className={styles.createdHeaderTitle}>Kuis Baru Dibuat!</span>
					<div className={styles.createdContent}>
						<img src={'/images/quiz-created.png'} className={styles.createdImage} />
						<span>Kuis baru berhasil dibuat, terbitkan segera!</span>
					</div>
					<div className={styles.createdFooter}>
						<Button
							type="Secondary"
							onClick={() => {
								setIsSuccessCreateQuiz(false);
								closeFunction();
							}}
						>
							Tutup
						</Button>
					</div>
				</>
			) : (
				<>
					<span className={styles.headerTitle}>Membuat Kuis</span>
					<div className={styles.content}>
						<form className={styles.form}>
							<input
								className={styles.formInput}
								type="text"
								placeholder="Nama Kuis"
								value={form.namaKuis}
								onChange={(e) => setForm({ ...form, namaKuis: e.target.value })}
							/>
							<div
								className={styles.formSelect}
								onClick={() => {
									setIsSelectKelas(!isSelectKelas);
								}}
								ref={kelasRef}
							>
								<span className={form.kelas === '' ? styles.placeholder : styles.selected}>
									{form.kelas === '' ? 'Kelas' : form.kelas}
								</span>
								<FontAwesomeIcon
									icon={isSelectKelas ? faArrowUp : faArrowDown}
									className={styles.arrowIcon}
								/>
								<SelectionBox
									isShow={isSelectKelas}
									className={styles.kelasSelection}
									handleClose={() => setIsSelectKelas(false)}
									options={{
										title: 'Kelas',
										data: tempData.kelas.map((item) => {
											return {
												id: item.id,
												option: item.nama,
											};
										}),
									}}
									handleSelected={(id) =>
										setForm({ ...form, kelas: tempData.kelas.find((item) => item.id === id).nama })
									}
								/>
							</div>
							<div
								className={styles.formSelect}
								onClick={() => {
									setIsSelectMataPelajaran(!isSelectMataPelajaran);
								}}
								ref={mataPelajaranRef}
							>
								<span className={form.mataPelajaran === '' ? styles.placeholder : styles.selected}>
									{form.mataPelajaran === '' ? 'Mata Pelajaran' : form.mataPelajaran}
								</span>
								<FontAwesomeIcon
									icon={isSelectMataPelajaran ? faArrowUp : faArrowDown}
									className={styles.arrowIcon}
								/>
								<SelectionBox
									isShow={isSelectMataPelajaran}
									className={styles.mataPelajaranSelection}
									handleClose={() => setIsSelectMataPelajaran(false)}
									options={{
										title: 'Mata Pelajaran',
										data: tempData.mataPelajaran.map((item) => {
											return {
												id: item.id,
												option: item.nama,
											};
										}),
									}}
									handleSelected={(id) =>
										setForm({
											...form,
											mataPelajaran: tempData.mataPelajaran.find((item) => item.id === id).nama,
										})
									}
								/>
							</div>
							<div
								className={styles.formSelect}
								onClick={() => {
									setIsSelectJurusan(!isSelectJurusan);
								}}
								ref={jurusanRef}
							>
								<span className={form.jurusan === '' ? styles.placeholder : styles.selected}>
									{form.jurusan === '' ? 'Jurusan' : form.jurusan}
								</span>
								<FontAwesomeIcon
									icon={isSelectJurusan ? faArrowUp : faArrowDown}
									className={styles.arrowIcon}
								/>
								<SelectionBox
									isShow={isSelectJurusan}
									className={styles.jurusanSelection}
									handleClose={() => setIsSelectJurusan(false)}
									options={{
										title: 'Jurusan',
										data: tempData.jurusan.map((item) => {
											return {
												id: item.id,
												option: item.nama,
											};
										}),
									}}
									handleSelected={(id) =>
										setForm({
											...form,
											jurusan: tempData.jurusan.find((item) => item.id === id).nama,
										})
									}
								/>
							</div>
							<div className={styles.gFormInput}>
								<input
									className={styles.formInput}
									type="text"
									placeholder="Link G-Form"
									value={form.linkGForm}
									onChange={(e) => {
										setForm({ ...form, linkGForm: e.target.value });
										setIsValidGForm(false);
										setIsCheckingGForm(false);
									}}
								/>
								<div className={styles.checkingIconContainer}>
									{!isCheckingGForm && !checkingGFormLoading && (
										<FontAwesomeIcon
											icon={faRotateRight}
											className={styles.checkingIcon}
											onClick={handleClickCheckingGForm}
										/>
									)}
									{!isCheckingGForm && checkingGFormLoading && (
										<FontAwesomeIcon icon={faRotateRight} className={styles.checkingIcon} spin />
									)}

									{!isValidGForm && isCheckingGForm && (
										<FontAwesomeIcon icon={faXmarkCircle} className={styles.checkingErrorIcon} />
									)}
									{isValidGForm && isCheckingGForm && (
										<FontAwesomeIcon icon={faCheckCircle} className={styles.checkingSuccessIcon} />
									)}
								</div>
							</div>
						</form>
					</div>
					<div className={styles.footer}>
						<Button
							type="Secondary"
							onClick={() => {
								setForm({
									namaKuis: '',
									kelas: '',
									mataPelajaran: '',
									jurusan: '',
									linkGForm: '',
								});
								setIsSelectKelas(false);
								setIsSelectMataPelajaran(false);
								setIsSelectJurusan(false);
								closeFunction();
							}}
						>
							Batal
						</Button>
						<Button type={formValidation ? 'Primary' : 'Disabled'}>Buat</Button>
					</div>
				</>
			)}
		</div>
	);
}
