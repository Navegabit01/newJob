import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './productos.service';
import { Product } from '../models/product';

describe('ProductService', () => {
  let productService: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    productService = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  describe('getProductos', () => {
    it('should return products from cache if available', () => {
      const dummyProducts: Product[] = [{
        id: 1, loaded: true,
        Image: '',
        Image1: '',
        Content: '',
        Keywords: '',
        Name: '',
        Category: '',
        Colors: '',
        Price: '',
        Promo_apply: '',
        Reviews: {
          votes: 0,
          rating: 0
        },
        Description_title: '',
        Description_content: '',
        Details: '',
        Care: {
          title: '',
          content: []
        },
        Color_detail: []
      }];
      productService['products'] = dummyProducts; // Set cache
      productService.getProductos().subscribe(products => {
        expect(products).toEqual(dummyProducts);
      });
    });

    it('should return products from HTTP response if cache is empty', () => {
      const dummyProducts: Product[] = [{
        id: 1, loaded: true,
        Image: '',
        Image1: '',
        Content: '',
        Keywords: '',
        Name: '',
        Category: '',
        Colors: '',
        Price: '',
        Promo_apply: '',
        Reviews: {
          votes: 0,
          rating: 0
        },
        Description_title: '',
        Description_content: '',
        Details: '',
        Care: {
          title: '',
          content: []
        },
        Color_detail: []
      }];
      productService.getProductos().subscribe(products => {
        expect(products).toEqual(dummyProducts);
      });
      const req = httpTestingController.expectOne('assets/DatosScraping.json');
      expect(req.request.method).toEqual('GET');
      req.flush(dummyProducts);
    });

    it('should handle errors gracefully', () => {
      productService.getProductos().subscribe(products => {
        expect(products).toEqual([]); // Empty array should be returned on error
      });
      const req = httpTestingController.expectOne('assets/DatosScraping.json');
      expect(req.request.method).toEqual('GET');
      req.error(new ErrorEvent('network error'));
    });
  });

});

