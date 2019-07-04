import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {take} from 'rxjs/operators';
import {SignedOutRequested, SignInRequested} from '../../auth/store/auth.actions';
import {TagsRequested, WorkshopRequested} from '../store/workshops.actions';
import {selectTags, selectWorkshop} from '../store/workshops.selectors';
import {Subscription} from 'rxjs';
import {Tag} from '../../models/additional.model';
import {WorkshopModel} from '../../models/workshop.model';
import {WorkshopService} from '../services/workshop.service';

@Component({
    selector: 'app-create-workshop',
    templateUrl: './create-workshop.component.pug',
    styleUrls: ['./create-workshop.component.scss']
})
export class CreateWorkshopComponent implements OnInit, OnDestroy {

    createWorkshopForm: FormGroup;
    return: string;
    tags: Tag[];
    selectedTags: string[] = [];

    private tagsSbs: Subscription;
    private subscription: Subscription;
    private workshopSbs: Subscription;

    id: string;
    workshopLoad = false;
    isEdited = false;
    requestTypeChecked = false;
    workshop: Partial<WorkshopModel> = {
        title: '',
        description: '',
        image: '',
        text: '',
        tags: [],
    };

    constructor(private fb: FormBuilder,
                private userService: UserService,
                private router: Router,
                private route: ActivatedRoute,
                private store: Store<AppState>,
                private workshopService: WorkshopService) {
    }

    ngOnInit() {
        this.store.dispatch(new TagsRequested());
        this.subscription = this.route.params
            .subscribe(params => {
                if (params.id) {
                    this.isEdited = true;
                    this.id = params.id;
                    this.store.dispatch(new WorkshopRequested({workshopId: this.id}));
                }
                this.requestTypeChecked = true;
            });

        this.workshopSbs = this.store.pipe(select(selectWorkshop)).subscribe(workshop => {
            if (this.requestTypeChecked) {
                if (workshop && this.isEdited) {
                    this.workshop.title = workshop.title;
                    this.workshop.description = workshop.description;
                    this.workshop.image = workshop.image;
                    this.workshop.text = workshop.text;
                    this.workshop.tags = workshop.tags;
                }
                this.createWorkshopForm = this.fb.group({
                    title: [this.workshop.title, [Validators.required,]],
                    image: [this.workshop.image, []],
                    description: [this.workshop.description, []],
                    text: [this.workshop.text, [Validators.required, ]],
                    tags: ['', []],
                });
                this.tagsSbs = this.store.pipe(select(selectTags)).subscribe(
                    tags => {
                        this.tags = tags;
                        if (this.tags) {
                            this.selectedTags = this.tags.filter(
                                tag => this.workshop.tags.includes(tag.seq))
                                .map(tag => tag.name);
                        }
                    }
                );
                this.workshopLoad = true;
            }
        });
    }

    get title(): AbstractControl {
        return this.createWorkshopForm.get('title');
    }

    get text(): AbstractControl {
        return this.createWorkshopForm.get('text');
    }

    get tagsInput(): AbstractControl {
        return this.createWorkshopForm.get('tags');
    }

    addTag(): void {
        const tagControl = this.createWorkshopForm.get('tags');
        const tagName = tagControl.value;
        if (tagName && !this.selectedTags.includes(tagName)) {
            this.selectedTags.push(tagName);
        }
        tagControl.reset();
    }

    removeTag(name: string): void {
        this.selectedTags = this.selectedTags.filter((tag) => tag !== name);
    }

    submitForm(): void {
        if (this.createWorkshopForm.valid && this.selectedTags) {
            const formValues = this.createWorkshopForm.value;
            this.workshop = {
                title: formValues.title,
                description: formValues.description,
                image: formValues.image,
                text: formValues.text,
            };

            this.workshop.tags = this.tags.filter(
                tag => this.selectedTags.includes(tag.name))
                .map(tag => tag.seq);
            if (this.isEdited) {
                this.workshopService.updateWorkshop(this.id, this.workshop)
                    .pipe(take(1))
                    .subscribe((response) => {
                        this.router.navigate(['workshops/workshop', this.id]);
                    });
            } else {
                this.workshopService.creatWorkshop(this.workshop)
                    .pipe(take(1))
                    .subscribe((response) => {
                        this.router.navigate(['workshops/workshop', response.post.id]);
                    });
            }
        }
    }

    cleanForm() {
        this.selectedTags = [];
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.workshopSbs.unsubscribe();
        this.tagsSbs.unsubscribe();
    }


}
